import React from 'react';
import { prisma } from '@/lib/prisma';
import DestinationForm from '../../DestinationForm';
import { redirect } from 'next/navigation';

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const destination = await prisma.destination.findUnique({
    where: { id: resolvedParams.id }
  });

  if (!destination) {
    redirect('/admin/destinations');
  }

  return (
    <DestinationForm 
      destination={{
        id: destination.id,
        name: destination.name,
        description: destination.description || '',
        image: destination.image || '',
      }} 
    />
  );
}
