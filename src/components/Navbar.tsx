import React from 'react';
import Link from 'next/link';
import { Heart, Menu, User } from 'lucide-react';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  return (
    <nav className={`w-full z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 ${transparent ? 'absolute top-0 left-0 right-0 text-white' : 'sticky top-0 bg-white text-slate-900 shadow-sm border-b border-slate-100'}`}>
      <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transparent ? 'bg-white/20' : 'bg-[#0A1F44]'}`}>
           <span className="font-bold text-xl text-white">K</span>
        </div>
        <span className="font-bold text-xl tracking-wide">Komodo Lombok Cruise</span>
      </Link>

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
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}
