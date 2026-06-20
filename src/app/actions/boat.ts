'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBoat(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const type = formData.get('type') as string;
  const capacity = parseInt(formData.get('capacity') as string);
  const basePrice = parseFloat(formData.get('basePrice') as string);
  
  // Create slug from name
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

  await prisma.boat.create({
    data: {
      name,
      slug,
      description,
      featuredImage: featuredImage || null,
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
