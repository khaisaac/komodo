import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  slug: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
}

export default function BlogCard({ slug, image, category, title, excerpt, author, date }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-xl text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3 flex-1">{excerpt}</p>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
