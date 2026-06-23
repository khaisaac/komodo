import React from 'react';
import { prisma } from '@/lib/prisma';
import EditTripForm from './EditTripForm';
import { redirect } from 'next/navigation';

export default async function EditTripPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const trip = await prisma.trip.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!trip) {
    redirect('/admin/trips');
  }

  // Parse pricingOptions since it's JSON in Prisma
  let parsedPricingOptions = [{ name: '', price: '' }];
  if (trip.pricingOptions && Array.isArray(trip.pricingOptions) && trip.pricingOptions.length > 0) {
    parsedPricingOptions = trip.pricingOptions as any;
  }

  const destinations = await prisma.destination.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <EditTripForm 
      trip={{
        id: trip.id,
        title: trip.title,
        destinationId: trip.destinationId || '',
        durationDays: trip.durationDays,
        durationNights: trip.durationNights,
        basePrice: Number(trip.basePrice),
        featuredImage: trip.featuredImage || '',
        description: trip.description,
        gallery: trip.gallery,
      }} 
      initialPricingOptions={parsedPricingOptions} 
      destinations={destinations}
    />
  );
}
