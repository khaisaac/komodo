'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getDestinations() {
  return await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createDestination(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;
  
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

  await prisma.destination.create({
    data: {
      name,
      slug,
      description,
      image: image || null,
    }
  });

  revalidatePath('/admin/destinations');
  revalidatePath('/');
  revalidatePath('/trips');
  redirect('/admin/destinations');
}

export async function updateDestination(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;

  await prisma.destination.update({
    where: { id },
    data: {
      name,
      description,
      image: image || null,
    }
  });

  revalidatePath('/admin/destinations');
  revalidatePath('/');
  revalidatePath('/trips');
  redirect('/admin/destinations');
}

export async function deleteDestination(id: string) {
  await prisma.destination.delete({
    where: { id }
  });

  revalidatePath('/admin/destinations');
  revalidatePath('/');
  revalidatePath('/trips');
}
