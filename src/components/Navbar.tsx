'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Menu, X } from 'lucide-react';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={`w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 ${transparent ? 'absolute top-0 left-0 right-0' : 'sticky top-0 bg-white shadow-sm border-b border-slate-100'} ${(transparent && !isOpen) ? 'text-white' : 'text-slate-900'}`}>
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${(transparent && !isOpen) ? 'bg-white/20' : 'bg-[#0A1F44]'}`}>
             <span className="font-bold text-xl text-white">K</span>
          </div>
          <span className="font-bold text-xl tracking-wide">Komodo Lombok Cruise</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${transparent ? '' : 'text-slate-600'}`}>
          <Link href="/trips" className={`transition-colors ${transparent ? 'hover:text-blue-200' : 'hover:text-[#0A1F44]'}`}>Trips</Link>
          <Link href="/liveaboard" className={`transition-colors ${transparent ? 'hover:text-blue-200' : 'hover:text-[#0A1F44]'}`}>Liveaboard</Link>
          <Link href="/blog" className={`transition-colors ${transparent ? 'hover:text-blue-200' : 'hover:text-[#0A1F44]'}`}>Blog</Link>
          <Link href="/about" className={`transition-colors ${transparent ? 'hover:text-blue-200' : 'hover:text-[#0A1F44]'}`}>About Us</Link>
          <Link href="/contact" className={`transition-colors ${transparent ? 'hover:text-blue-200' : 'hover:text-[#0A1F44]'}`}>Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors ${transparent ? 'hover:text-blue-200' : 'text-slate-600 hover:text-[#0A1F44]'}`}>
            <Heart className="w-4 h-4" />
            Wishlist
          </button>
          
          {/* MOBILE MENU BUTTON */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-24 px-6 flex flex-col gap-6 text-slate-900 shadow-xl overflow-y-auto">
          <Link href="/trips" onClick={() => setIsOpen(false)} className="text-xl font-semibold hover:text-blue-600 transition-colors border-b border-slate-100 pb-4">Trips</Link>
          <Link href="/liveaboard" onClick={() => setIsOpen(false)} className="text-xl font-semibold hover:text-blue-600 transition-colors border-b border-slate-100 pb-4">Liveaboard</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="text-xl font-semibold hover:text-blue-600 transition-colors border-b border-slate-100 pb-4">Blog</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-xl font-semibold hover:text-blue-600 transition-colors border-b border-slate-100 pb-4">About Us</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-xl font-semibold hover:text-blue-600 transition-colors border-b border-slate-100 pb-4">Contact</Link>
          
          <div className="mt-8">
            <Link href="/contact" onClick={() => setIsOpen(false)} className="bg-[#0A1F44] text-white w-full py-4 rounded-xl font-bold flex justify-center items-center">
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
