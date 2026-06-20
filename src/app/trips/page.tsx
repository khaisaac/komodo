import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Open Trips | Komodo Lombok Cruise',
  description: 'Temukan paket Open Trip terbaik ke Komodo, Lombok, dan destinasi lainnya.',
};

export default async function TripsPage() {
  const trips = await prisma.trip.findMany({
    where: { type: 'OPEN_TRIP', status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      {/* HEADER SECTION */}
      <div className="bg-[#0A1F44] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop"
            alt="Open Trips Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Open Trips</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">Bergabunglah dengan petualang lain dan nikmati perjalanan tak terlupakan ke destinasi eksotis Indonesia dengan harga terbaik.</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="font-bold text-lg text-slate-900 mb-6 border-b pb-4">Filter Trips</h2>
            
            {/* Filter Group: Destination */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-700 mb-3 text-sm">Destinasi</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-600">Komodo (12)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm text-slate-600">Lombok (8)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm text-slate-600">Raja Ampat (4)</span>
                </label>
              </div>
            </div>

            {/* Filter Group: Duration */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-700 mb-3 text-sm">Durasi</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm text-slate-600">1 Hari (Day Trip)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-600">3 Hari 2 Malam</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm text-slate-600">4 Hari 3 Malam</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-[#0A1F44] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#112a5c] transition-colors">
              Terapkan Filter
            </button>
          </div>
        </aside>

        {/* TRIPS GRID */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-sm">Menampilkan <span className="font-bold text-slate-900">{trips.length}</span> Open Trips</p>
            <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Rekomendasi</option>
              <option>Harga: Terendah ke Tertinggi</option>
              <option>Harga: Tertinggi ke Terendah</option>
              <option>Rating Tertinggi</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.length === 0 ? (
              <p className="col-span-3 text-center text-slate-500 py-10">Belum ada paket Open Trip tersedia.</p>
            ) : (
              trips.map((trip) => (
                <TripCard 
                  key={trip.id}
                  image={trip.featuredImage || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"}
                  title={trip.title}
                  subtitle={`${trip.durationDays}D${trip.durationNights}N ${trip.destination}`}
                  rating={5.0} // Dummy
                  reviews={0} // Dummy
                  price={Number(trip.basePrice).toLocaleString('id-ID')}
                  slug={trip.slug}
                />
              ))
            )}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
              Muat Lebih Banyak
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
