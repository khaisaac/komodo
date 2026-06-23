'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryGridProps {
  images?: string[];
}

export default function GalleryGrid({ images = [] }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  // Ensure we only show up to 5 images in the grid
  const displayImages = images.slice(0, 5);
  const remainingCount = images.length - 5;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <>
      <div className="mb-8 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-100 p-2">
        <div className={`grid gap-2 h-[400px] md:h-[500px] ${displayImages.length === 1 ? 'grid-cols-1' : 'grid-cols-4 grid-rows-2'}`}>
          {/* Main Large Image */}
          <div 
            className={`relative group cursor-pointer overflow-hidden rounded-xl ${displayImages.length === 1 ? 'col-span-1 row-span-1' : 'col-span-4 md:col-span-2 row-span-2'}`}
            onClick={() => openLightbox(0)}
          >
            <Image 
              src={displayImages[0]} 
              alt="Gallery 1" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-5 h-5" />
            </div>
          </div>

          {/* Smaller Images */}
          {displayImages.slice(1).map((img, idx) => (
            <div 
              key={idx + 1} 
              className={`relative group cursor-pointer overflow-hidden rounded-xl hidden md:block ${displayImages.length === 2 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
              onClick={() => openLightbox(idx + 1)}
            >
              <Image 
                src={img} 
                alt={`Gallery ${idx + 2}`} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              
              {/* Overlay for the 5th image if there are more */}
              {idx === 3 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+{remainingCount}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/50 hover:bg-black/80 rounded-full transition-all"
                onClick={prevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 bg-black/50 hover:bg-black/80 rounded-full transition-all"
                onClick={nextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Current Image */}
          <div className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh]">
            <Image 
              src={images[lightboxIndex]} 
              alt={`Gallery Full ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
          
          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-wide">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
