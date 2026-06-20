import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
               <span className="font-bold text-xl text-white">K</span>
            </div>
            <span className="font-bold text-2xl tracking-wide text-white">Komodo Lombok Cruise</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Platform pemesanan Liveaboard dan Open Trip terbaik di Indonesia. Temukan petualangan impian Anda di Komodo, Lombok, dan destinasi menakjubkan lainnya.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/trips" className="hover:text-white transition-colors">Open Trips</Link></li>
            <li><Link href="/liveaboard" className="hover:text-white transition-colors">Liveaboard</Link></li>
            <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Travel Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <span>Labuan Bajo, Manggarai Barat, Nusa Tenggara Timur, Indonesia</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-sm text-center">
        <p>&copy; {new Date().getFullYear()} Komodo Lombok Cruise. All rights reserved.</p>
      </div>
    </footer>
  );
}
