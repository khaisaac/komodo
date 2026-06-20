import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiveaboardCard from '@/components/LiveaboardCard';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'Luxury Liveaboards | Komodo Lombok Cruise',
  description: 'Sewa kapal phinisi premium untuk petualangan layar Anda di Komodo, Raja Ampat, dan destinasi lainnya.',
};

export default async function LiveaboardPage() {
  const boats = await prisma.boat.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      {/* HEADER SECTION */}
      <div className="bg-[#0A1F44] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image 
            src="https://images.unsplash.com/photo-1548574505-12caf0050b5b?q=80&w=2000&auto=format&fit=crop"
            alt="Liveaboard Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Luxury Liveaboards</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">Eksplorasi keindahan bahari Nusantara dengan kenyamanan maksimal menggunakan armada phinisi pilihan kami.</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="font-bold text-lg text-slate-900 mb-6 border-b pb-4">Filter Kapal</h2>
            
            {/* Filter Group: Destination */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-700 mb-3 text-sm">Destinasi Berlayar</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-600">Komodo (15)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm text-slate-600">Raja Ampat (8)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm text-slate-600">Ambon / Banda (3)</span>
                </label>
              </div>
            </div>

            {/* Filter Group: Boat Type */}
            <div className="mb-6">
              <h3 className="font-semibold text-slate-700 mb-3 text-sm">Tipe Kapal</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" />
                  <span className="text-sm text-slate-600">Standard Phinisi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-600">Premium Phinisi</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" defaultChecked />
                  <span className="text-sm text-slate-600">Luxury Phinisi</span>
                </label>
              </div>
            </div>

            <button className="w-full bg-[#0A1F44] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#112a5c] transition-colors">
              Terapkan Filter
            </button>
          </div>
        </aside>

        {/* BOATS GRID */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-sm">Menampilkan <span className="font-bold text-slate-900">{boats.length}</span> Kapal</p>
            <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Rekomendasi</option>
              <option>Harga Sewa: Terendah</option>
              <option>Harga Sewa: Tertinggi</option>
              <option>Kapasitas Terbesar</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {boats.length === 0 ? (
              <p className="col-span-2 text-center text-slate-500 py-10">Belum ada armada Phinisi tersedia.</p>
            ) : (
              boats.map((boat) => {
                const specs = boat.specifications as any || {};
                return (
                  <LiveaboardCard 
                    key={boat.id}
                    image={boat.featuredImage || "https://images.unsplash.com/photo-1548574505-12caf0050b5b?q=80&w=800&auto=format&fit=crop"}
                    title={boat.name}
                    capacity={`${specs.capacity || 0} Guests`}
                    type={specs.type || 'Phinisi'}
                    rating={5.0} // Dummy
                    reviews={0} // Dummy
                    price={Number(specs.basePrice || 0).toLocaleString('id-ID')}
                  />
                );
              })
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
