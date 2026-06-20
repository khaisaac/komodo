'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart } from 'lucide-react';

interface TripCardProps {
  image: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  price: string;
  slug: string;
}

export default function TripCard({ image, title, subtitle, rating, reviews, price, slug }: TripCardProps) {
  return (
    <Link href={`/trips/${slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer block">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-colors z-10" onClick={(e) => e.preventDefault()}>
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-600">{rating}</span>
            </div>
            <span className="text-xs text-slate-400 mt-1">({reviews})</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">From</span>
            <span className="font-bold text-lg text-[#0A1F44]">Rp {price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
