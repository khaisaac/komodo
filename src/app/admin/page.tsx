import React from 'react';
import { prisma } from '@/lib/prisma';
import { Map, Ship, CalendarCheck, Users } from 'lucide-react';

export default async function AdminDashboardPage() {
  // Fetch summary counts from database
  const totalTrips = await prisma.trip.count();
  const totalBoats = await prisma.boat.count();
  const totalBookings = await prisma.booking.count();
  const totalUsers = await prisma.user.count();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Map className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm">Total Open Trips</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalTrips}</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Ship className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm">Total Liveaboards</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalBoats}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm">Total Bookings</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalBookings}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-slate-500 font-medium text-sm">Registered Users</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalUsers}</h3>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-blue-800">
        <h3 className="font-bold text-lg mb-2">Welcome to KLC Admin Panel!</h3>
        <p>Gunakan menu di sidebar sebelah kiri untuk mulai menambahkan paket Open Trip dan armada kapal Phinisi Anda ke dalam database.</p>
        <p className="mt-2 text-sm opacity-80">Catatan: Panel ini sementara dapat diakses publik untuk keperluan testing. Nanti akan diproteksi menggunakan sistem Login sebelum naik produksi.</p>
      </div>
    </div>
  );
}
