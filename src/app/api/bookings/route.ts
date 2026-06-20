import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

// Resend instance will be created dynamically to prevent build errors

function generateBookingCode() {
  return 'KLC-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { guestName, guestEmail, guestPhone, tripScheduleId, specialRequest } = data;

    if (!guestName || !guestEmail || !guestPhone) {
      return NextResponse.json(
        { error: 'Nama, Email, dan Nomor Telepon wajib diisi.' },
        { status: 400 }
      );
    }

    // Since we don't have real trips in the DB yet, we might get foreign key errors 
    // if we try to link to a non-existent tripScheduleId.
    // To handle this gracefully for the demo, we will check if the schedule exists.
    // If not, we will throw a mock error or we can bypass it if we want a pure UI demo.
    // However, Prisma will throw an error if `tripScheduleId` does not exist.
    // For the sake of the demo, let's create a dummy schedule if it doesn't exist.
    
    // Check if the dummy schedule exists, if not, create a dummy trip and schedule
    let schedule = await prisma.tripSchedule.findUnique({
      where: { id: tripScheduleId }
    });

    if (!schedule) {
      // Create a dummy Trip and Schedule to satisfy Foreign Key constraints
      const dummyTrip = await prisma.trip.upsert({
        where: { slug: 'dummy-trip' },
        update: {},
        create: {
          title: 'Dummy Trip',
          slug: 'dummy-trip',
          type: 'OPEN_TRIP',
          destination: 'Komodo',
          durationDays: 3,
          durationNights: 2,
          description: 'This is a dummy trip for booking demo.',
          basePrice: 3500000,
          status: 'PUBLISHED'
        }
      });

      schedule = await prisma.tripSchedule.create({
        data: {
          id: tripScheduleId,
          tripId: dummyTrip.id,
          startDate: new Date(),
          endDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
          totalSeats: 10,
          availableSeats: 10,
          status: 'SCHEDULED'
        }
      });
    }

    const bookingCode = generateBookingCode();

    // 1. Create Booking in Database
    const booking = await prisma.booking.create({
      data: {
        bookingCode,
        guestName,
        guestEmail,
        guestPhone,
        tripScheduleId,
        specialRequest,
        subtotal: 3500000, // Hardcoded for demo
        grandTotal: 3500000, // Hardcoded for demo
        status: 'PENDING',
        paymentType: 'FULL'
      },
    });

    // 2. Send Email Notification via Resend
    // Skip if no API Key is set to avoid crashing the demo locally
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Komodo Lombok Cruise <noreply@komodolombokcruise.com>', // You might need a verified domain in Resend
        to: guestEmail,
        subject: `Konfirmasi Pemesanan Anda - ${bookingCode}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #0A1F44;">Terima Kasih Atas Pesanan Anda!</h1>
            <p>Halo <strong>${guestName}</strong>,</p>
            <p>Kami telah menerima permintaan pemesanan Anda dengan kode booking: <strong style="color: #2563EB;">${bookingCode}</strong>.</p>
            <p>Tim kami akan segera menghubungi Anda melalui nomor WhatsApp (${guestPhone}) untuk detail instruksi pembayaran.</p>
            <br/>
            <h3>Detail Pesanan:</h3>
            <ul>
              <li><strong>Total Pembayaran:</strong> Rp 3.500.000</li>
              <li><strong>Permintaan Khusus:</strong> ${specialRequest || '-'}</li>
            </ul>
            <br/>
            <p>Salam hangat,</p>
            <p><strong>Tim Komodo Lombok Cruise</strong></p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, bookingCode });
  } catch (error: any) {
    console.error('Booking Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memproses pesanan.' },
      { status: 500 }
    );
  }
}
