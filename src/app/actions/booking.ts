'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import crypto from 'crypto';

function generateDokuSignature(clientId: string, requestId: string, requestTimestamp: string, requestTarget: string, body: any, secret: string) {
  const digest = crypto.createHash('sha256').update(JSON.stringify(body)).digest('base64');
  const signatureString = `Client-Id:${clientId}\nRequest-Id:${requestId}\nRequest-Timestamp:${requestTimestamp}\nRequest-Target:${requestTarget}\nDigest:${digest}`;
  const hmac = crypto.createHmac('sha256', secret).update(signatureString).digest('base64');
  return `HMACSHA256=${hmac}`;
}

export async function processCheckout(formData: FormData) {
  const tripId = formData.get('tripId') as string;
  const tripTitle = formData.get('tripTitle') as string;
  const selectedPackageName = formData.get('selectedPackageName') as string;
  const selectedPackagePrice = parseFloat(formData.get('selectedPackagePrice') as string);
  const guestName = formData.get('guestName') as string;
  const guestEmail = formData.get('guestEmail') as string;
  const guestPhone = formData.get('guestPhone') as string;

  // 1. Ensure a TripSchedule exists to attach the Booking to. 
  // For open trips without specific dates in this simplified UI, we use a generic "Open Date" schedule.
  let schedule = await prisma.tripSchedule.findFirst({
    where: { tripId }
  });

  if (!schedule) {
    // Auto-create a dummy schedule spanning next year
    schedule = await prisma.tripSchedule.create({
      data: {
        tripId,
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        totalSeats: 100,
        availableSeats: 100,
      }
    });
  }

  // 2. Create Booking in Database (Status: PENDING)
  const bookingCode = `KLC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  const booking = await prisma.booking.create({
    data: {
      bookingCode,
      guestName,
      guestEmail,
      guestPhone,
      tripScheduleId: schedule.id,
      subtotal: selectedPackagePrice,
      grandTotal: selectedPackagePrice,
      status: 'PENDING',
      specialRequest: `Package: ${selectedPackageName}`,
    }
  });

  // 3. Connect to DOKU Payment Gateway (Production)
  const DOKU_CLIENT_ID = process.env.DOKU_CLIENT_ID || '';
  const DOKU_SECRET_KEY = process.env.DOKU_SECRET_KEY || '';
  
  // If credentials are not set, we cannot proceed with real DOKU. 
  // But we will generate the payload assuming they are set.
  if (!DOKU_CLIENT_ID || !DOKU_SECRET_KEY) {
    console.warn("DOKU_CLIENT_ID or DOKU_SECRET_KEY is missing. Redirecting to a dummy page or error.");
    // For now, let's redirect to a local success page just to show the UI flow if keys are missing
    redirect(`/trips/success?bookingCode=${bookingCode}`);
  }

  const requestId = crypto.randomUUID();
  const requestTimestamp = new Date().toISOString().slice(0, 19) + 'Z';
  const requestTarget = '/checkout/v1/payment';
  
  const payload = {
    order: {
      amount: selectedPackagePrice,
      invoice_number: bookingCode,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/doku/callback`,
      line_items: [
        {
          name: `${tripTitle} - ${selectedPackageName}`,
          price: selectedPackagePrice,
          quantity: 1
        }
      ]
    },
    payment: {
      payment_due_date: 60 // 60 minutes
    },
    customer: {
      name: guestName,
      email: guestEmail,
      phone: guestPhone
    }
  };

  const signature = generateDokuSignature(DOKU_CLIENT_ID, requestId, requestTimestamp, requestTarget, payload, DOKU_SECRET_KEY);

  let paymentUrl = '';

  try {
    const response = await fetch('https://api.doku.com/checkout/v1/payment', {
      method: 'POST',
      headers: {
        'Client-Id': DOKU_CLIENT_ID,
        'Request-Id': requestId,
        'Request-Timestamp': requestTimestamp,
        'Signature': signature,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (data.response?.payment?.url) {
      paymentUrl = data.response.payment.url;
    } else {
      console.error("DOKU API Error:", data);
      throw new Error("Gagal mendapatkan URL Pembayaran DOKU.");
    }
  } catch (err) {
    console.error("DOKU Checkout Error:", err);
    throw new Error("Sistem pembayaran sedang mengalami gangguan.");
  }

  // 4. Redirect to DOKU Checkout URL
  redirect(paymentUrl);
}
