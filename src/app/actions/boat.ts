'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBoat(formData: FormData) {
  const name = formData.get('name') as string;
  const destinationId = formData.get('destinationId') as string;
  const description = formData.get('description') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const type = formData.get('type') as string;
  const capacity = parseInt(formData.get('capacity') as string);
  const basePrice = parseFloat(formData.get('basePrice') as string);
  const galleryStr = formData.get('gallery') as string;
  const rating = parseFloat(formData.get('rating') as string) || 5.0;
  const reviewCount = parseInt(formData.get('reviewCount') as string) || 0;
  
  // Create slug from name
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

  await prisma.boat.create({
    data: {
      name,
      slug,
      destinationId: destinationId || null,
      description,
      featuredImage: featuredImage || null,
      gallery: galleryStr ? JSON.parse(galleryStr) : null,
      rating,
      reviewCount,
      specifications: {
        type,
        capacity,
        basePrice
      }
    }
  });

  revalidatePath('/admin/boats');
  revalidatePath('/liveaboard');
  revalidatePath('/');
  redirect('/admin/boats');
}

export async function deleteBoat(id: string) {
  await prisma.boat.delete({
    where: { id }
  });

  revalidatePath('/admin/boats');
  revalidatePath('/liveaboard');
  revalidatePath('/');
}
