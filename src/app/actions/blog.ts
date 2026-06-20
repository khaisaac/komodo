'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createBlog(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const thumbnail = formData.get('thumbnail') as string;
  const status = formData.get('status') as any || 'PUBLISHED';
  
  // Auto-generate slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

  // Default User (Author)
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@komodolombokcruise.com',
        passwordHash: 'dummy' // this is just a fallback for testing
      }
    });
  }

  // Default Category
  let category = await prisma.blogCategory.findFirst();
  if (!category) {
    category = await prisma.blogCategory.create({
      data: {
        name: 'Uncategorized',
        slug: 'uncategorized'
      }
    });
  }

  await prisma.blog.create({
    data: {
      title,
      slug,
      content,
      thumbnail: thumbnail || null,
      status,
      authorId: user.id,
      categoryId: category.id,
    }
  });

  revalidatePath('/admin/blog');
  revalidatePath('/');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function updateBlog(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const thumbnail = formData.get('thumbnail') as string;
  const status = formData.get('status') as any || 'PUBLISHED';
  
  // optionally update slug
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);

  await prisma.blog.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      thumbnail: thumbnail || null,
      status,
    }
  });

  revalidatePath('/admin/blog');
  revalidatePath('/');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function deleteBlog(id: string) {
  await prisma.blog.delete({
    where: { id }
  });
  
  revalidatePath('/admin/blog');
  revalidatePath('/');
  revalidatePath('/blog');
}
