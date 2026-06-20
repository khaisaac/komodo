import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log the DOKU Notification
    console.log('DOKU Webhook Received:', body);

    // Get the invoice number (which we set as bookingCode)
    const bookingCode = body?.order?.invoice_number;
    const transactionStatus = body?.transaction?.status; // e.g. 'SUCCESS'

    if (!bookingCode) {
      return NextResponse.json({ message: 'Invalid payload, missing invoice_number' }, { status: 400 });
    }

    // Check if payment was successful
    if (transactionStatus === 'SUCCESS') {
      // Find the booking
      const booking = await prisma.booking.findUnique({
        where: { bookingCode },
        include: { schedule: { include: { trip: true } } }
      });

      if (booking && booking.status !== 'PAID') {
        // Update booking status to PAID
        await prisma.booking.update({
          where: { bookingCode },
          data: { status: 'PAID' }
        });

        // Send confirmation email via Resend
        if (booking.guestEmail) {
          try {
            await resend.emails.send({
              from: 'Komodo Lombok Cruise <noreply@komodolombokcruise.com>', // requires verified domain in Resend
              to: booking.guestEmail,
              subject: `E-Ticket Confirmed: ${booking.schedule.trip.title}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h2 style="color: #0A1F44;">Pembayaran Berhasil!</h2>
                  <p>Halo <strong>${booking.guestName}</strong>,</p>
                  <p>Terima kasih atas pembayaran Anda. Booking Anda telah terkonfirmasi.</p>
                  <div style="background-color: #F8FAFC; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Kode Booking:</strong> ${booking.bookingCode}</p>
                    <p><strong>Paket Trip:</strong> ${booking.schedule.trip.title}</p>
                    <p><strong>Total Pembayaran:</strong> Rp ${Number(booking.grandTotal).toLocaleString('id-ID')}</p>
                  </div>
                  <p>Kami akan segera menghubungi Anda melalui WhatsApp untuk kordinasi keberangkatan.</p>
                  <p>Salam hangat,<br>Tim Komodo Lombok Cruise</p>
                </div>
              `
            });
            console.log(`Confirmation email sent to ${booking.guestEmail}`);
          } catch (emailErr) {
            console.error('Failed to send confirmation email:', emailErr);
          }
        }
      }
    }

    // DOKU expects a 200 OK response
    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });

  } catch (err) {
    console.error('Webhook Error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
