import React, { Suspense } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiveaboardCard from '@/components/LiveaboardCard';
import LiveaboardFilterSidebar from '@/components/LiveaboardFilterSidebar';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Luxury Liveaboards | Komodo Lombok Cruise',
  description: 'Rent a premium phinisi boat for your sailing adventure in Komodo, Raja Ampat, and other destinations.',
};

export default async function LiveaboardPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  
  const destinationIds = resolvedSearchParams.destinationId 
    ? (Array.isArray(resolvedSearchParams.destinationId) ? resolvedSearchParams.destinationId : [resolvedSearchParams.destinationId])
    : [];

  const types = resolvedSearchParams.type
    ? (Array.isArray(resolvedSearchParams.type) ? resolvedSearchParams.type : [resolvedSearchParams.type])
    : [];

  const whereClause: any = {};
  
  if (destinationIds.length > 0) {
    whereClause.destinationId = { in: destinationIds };
  }
  
  // Fetch all boats to get all available types, or we can use JSON path filtering if supported, 
  // but it's simpler to fetch all boats for types or just use a predefined list.
  // Prisma JSON filtering on MySQL is sometimes tricky. We will fetch all boats first to extract unique types.
  const allBoatsForTypes = await prisma.boat.findMany({ select: { specifications: true } });
  const uniqueBoatTypes = Array.from(new Set(allBoatsForTypes.map(b => {
    const specs = b.specifications as any;
    return specs?.type || 'Phinisi';
  }).filter(Boolean)));

  // MySQL JSON filtering
  if (types.length > 0) {
    whereClause.specifications = {
      path: '$.type',
      string_contains: types[0] // Simplified, prisma JSON filter on MySQL has limitations for 'in' array
    };
    // Note: Due to Prisma MySQL JSON limitations, filtering by multiple types perfectly via query might be complex. 
    // We'll filter in-memory if needed, but for simplicity we will fetch and filter.
  }

  // Fetch boats
  let boats = await prisma.boat.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: { destination: true }
  });

  // If multiple types are selected, we filter in memory because Prisma MySQL JSON filtering for IN array is complex
  if (types.length > 0) {
    boats = boats.filter(boat => {
      const specs = boat.specifications as any;
      const type = specs?.type || 'Phinisi';
      return types.includes(type);
    });
  }

  // Fetch destinations with boat count
  const dbDestinations = await prisma.destination.findMany({
    include: {
      _count: {
        select: { boats: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  const destinations = dbDestinations.map(d => ({
    id: d.id,
    name: d.name,
    boatCount: d._count.boats
  }));

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
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">Explore the marine beauty of the archipelago with maximum comfort using our curated fleet of phinisi.</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <Suspense fallback={<div className="w-full md:w-64 shrink-0 bg-white p-6 rounded-2xl shadow-sm h-64 animate-pulse"></div>}>
          <LiveaboardFilterSidebar destinations={destinations} boatTypes={uniqueBoatTypes} />
        </Suspense>

        {/* BOATS GRID */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-sm">Showing <span className="font-bold text-slate-900">{boats.length}</span> Boats</p>
            <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Charter Price: Low to High</option>
              <option>Charter Price: High to Low</option>
              <option>Largest Capacity</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {boats.length === 0 ? (
              <p className="col-span-2 text-center text-slate-500 py-10">No Liveaboards available yet.</p>
            ) : (
              boats.map((boat) => {
                const specs = boat.specifications as any || {};
                return (
                  <LiveaboardCard 
                    key={boat.id}
                    image={boat.featuredImage || "/hero.png"}
                    title={boat.name}
                    capacity={`${specs.capacity || 0} Guests`}
                    type={specs.type || 'Phinisi'}
                    rating={boat.rating ?? 5.0}
                    reviews={boat.reviewCount ?? 0}
                    price={Number(specs.basePrice || 0).toLocaleString('id-ID')}
                    slug={boat.slug}
                  />
                );
              })
            )}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
              Load More
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
