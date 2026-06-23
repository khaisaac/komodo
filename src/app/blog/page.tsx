import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Travel Guides & Tips | Komodo Lombok Cruise',
};

export default async function BlogIndexPage() {
  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A1F44] mb-4">Travel Guides & Tips</h1>
          <p className="text-lg text-slate-500 max-w-2xl">
            Discover guides, tips, and inspiring stories about traveling in Komodo National Park and Lombok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-100">
              No articles published yet.
            </div>
          ) : (
            blogs.map((blog) => {
              const excerpt = blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
              
              return (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                    <Image 
                      src={blog.thumbnail || "/hero.png"}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{blog.category?.name || 'Article'}</div>
                    <h3 className="font-bold text-xl text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-4">{excerpt}</p>
                    <div className="mt-auto pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
