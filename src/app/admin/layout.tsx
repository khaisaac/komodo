import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Map, Ship, CalendarCheck, Settings, LogOut, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Dashboard | Komodo Lombok Cruise',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0A1F44] text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">K</div>
          <span className="font-bold text-lg tracking-wide">Admin KLC</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/trips" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <Map className="w-5 h-5" />
            <span className="font-medium">Open Trips</span>
          </Link>
          <Link href="/admin/boats" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <Ship className="w-5 h-5" />
            <span className="font-medium">Liveaboards (Boats)</span>
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <CalendarCheck className="w-5 h-5" />
            <span className="font-medium">Bookings</span>
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
            <span className="font-medium">Blog & Articles</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Back to Website</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
