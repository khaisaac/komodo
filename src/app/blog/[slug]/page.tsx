import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) return { title: 'Artikel Tidak Ditemukan' };
  return { title: `${blog.title} | Komodo Lombok Cruise` };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { author: true, category: true }
  });

  if (!blog || blog.status !== 'PUBLISHED') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      <main className="flex-1 w-full pt-12 pb-24">
        {/* Article Header */}
        <div className="max-w-3xl mx-auto px-4 mb-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Blog
          </Link>
          
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">
            {blog.category?.name || 'Artikel'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1F44] mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-6 text-slate-500 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author?.name || 'Admin'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'})}</span>
            </div>
          </div>
        </div>

        {/* Article Image */}
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm border border-slate-100">
            <Image 
              src={blog.thumbnail || "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2000&auto=format&fit=crop"}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Article Content (Render HTML from Quill) */}
        <div className="max-w-3xl mx-auto px-4">
          <div 
            className="prose prose-slate prose-lg md:prose-xl max-w-none text-slate-800
                       prose-headings:text-[#0A1F44] prose-a:text-blue-600 hover:prose-a:text-blue-700
                       prose-img:rounded-xl prose-img:border prose-img:border-slate-100"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
