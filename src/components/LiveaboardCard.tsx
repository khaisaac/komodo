import React from 'react';
import Image from 'next/image';
import { Users, Star } from 'lucide-react';

interface LiveaboardCardProps {
  image: string;
  title: string;
  capacity: string;
  type: string;
  rating: number;
  reviews: number;
  price: string;
}

export default function LiveaboardCard({ image, title, capacity, type, rating, reviews, price }: LiveaboardCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {type}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl text-slate-900 leading-tight mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Users className="w-4 h-4" />
              <span>{capacity}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
           <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-slate-700">{rating} <span className="text-slate-400 font-normal">({reviews})</span></span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Charter from</span>
            <span className="font-bold text-lg text-[#0A1F44]">Rp {price}<span className="text-sm font-normal text-slate-500">/day</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
