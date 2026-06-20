'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTrip(formData: FormData) {
  const title = formData.get('title') as string;
  const destination = formData.get('destination') as string;
  const durationDays = parseInt(formData.get('durationDays') as string);
  const durationNights = parseInt(formData.get('durationNights') as string);
  const basePrice = parseFloat(formData.get('basePrice') as string);
  const description = formData.get('description') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const pricingOptionsStr = formData.get('pricingOptionsStr') as string;
  
  let pricingOptions = null;
  if (pricingOptionsStr) {
    try {
      pricingOptions = JSON.parse(pricingOptionsStr);
      // Clean up the structure, convert price string to number
      pricingOptions = pricingOptions.map((opt: any) => ({
        name: opt.name,
        price: parseFloat(opt.price || '0')
      }));
    } catch (e) {
      console.error("Failed to parse pricingOptionsStr", e);
    }
  }

  // Create slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

  await prisma.trip.create({
    data: {
      title,
      slug,
      type: 'OPEN_TRIP',
      destination,
      durationDays,
      durationNights,
      description,
      basePrice,
      pricingOptions: pricingOptions || undefined,
      featuredImage: featuredImage || null,
      status: 'PUBLISHED',
    }
  });

  revalidatePath('/admin/trips');
  revalidatePath('/trips');
  revalidatePath('/');
  redirect('/admin/trips');
}

export async function deleteTrip(id: string) {
  await prisma.trip.delete({
    where: { id }
  });

  revalidatePath('/admin/trips');
  revalidatePath('/trips');
  revalidatePath('/');
}

export async function updateTrip(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const destination = formData.get('destination') as string;
  const durationDays = parseInt(formData.get('durationDays') as string);
  const durationNights = parseInt(formData.get('durationNights') as string);
  const basePrice = parseFloat(formData.get('basePrice') as string);
  const description = formData.get('description') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const pricingOptionsStr = formData.get('pricingOptionsStr') as string;
  
  let pricingOptions = null;
  if (pricingOptionsStr) {
    try {
      pricingOptions = JSON.parse(pricingOptionsStr);
      pricingOptions = pricingOptions.map((opt: any) => ({
        name: opt.name,
        price: parseFloat(opt.price || '0')
      }));
    } catch (e) {
      console.error("Failed to parse pricingOptionsStr", e);
    }
  }

  // Update slug based on title if necessary, but usually better to keep original or regenerate
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

  await prisma.trip.update({
    where: { id },
    data: {
      title,
      slug,
      destination,
      durationDays,
      durationNights,
      description,
      basePrice,
      pricingOptions: pricingOptions || undefined,
      featuredImage: featuredImage || null,
    }
  });

  revalidatePath('/admin/trips');
  revalidatePath('/');
  revalidatePath('/trips');
  
  redirect('/admin/trips');
}
