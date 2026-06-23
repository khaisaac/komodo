import React from 'react';
import { prisma } from '@/lib/prisma';
import CreateBoatForm from './CreateBoatForm';

export default async function CreateBoatPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { name: 'asc' }
  });

  return <CreateBoatForm destinations={destinations} />;
}
