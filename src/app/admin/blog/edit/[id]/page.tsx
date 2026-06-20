import React from 'react';
import { prisma } from '@/lib/prisma';
import EditBlogForm from './EditBlogForm';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { id }
  });

  if (!blog) {
    notFound();
  }

  return <EditBlogForm blog={blog} />;
}
