import React from 'react';
import CreateTripForm from './CreateTripForm';
import { prisma } from '@/lib/prisma';

export default async function CreateTripPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: 'asc' }
  });

  return <CreateTripForm destinations={destinations} />;
}
