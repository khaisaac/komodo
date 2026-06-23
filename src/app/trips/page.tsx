import React, { Suspense } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TripCard from '@/components/TripCard';
import FilterSidebar from '@/components/FilterSidebar';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Open Trips | Komodo Lombok Cruise',
  description: 'Find the best Open Trip packages to Komodo, Lombok, and other destinations.',
};

export default async function TripsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const resolvedSearchParams = await searchParams;
  
  const destinationIds = resolvedSearchParams.destinationId 
    ? (Array.isArray(resolvedSearchParams.destinationId) ? resolvedSearchParams.destinationId : [resolvedSearchParams.destinationId])
    : [];

  const durations = resolvedSearchParams.durationDays
    ? (Array.isArray(resolvedSearchParams.durationDays) ? resolvedSearchParams.durationDays : [resolvedSearchParams.durationDays]).map(Number)
    : [];

  const whereClause: any = { type: 'OPEN_TRIP', status: 'PUBLISHED' };
  
  if (destinationIds.length > 0) {
    whereClause.destinationId = { in: destinationIds };
  }
  
  if (durations.length > 0) {
    whereClause.durationDays = { in: durations };
  }

  const trips = await prisma.trip.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: { destination: true }
  });

  // Fetch all destinations with their trip count
  const dbDestinations = await prisma.destination.findMany({
    include: {
      _count: {
        select: { trips: { where: { type: 'OPEN_TRIP', status: 'PUBLISHED' } } }
      }
    },
    orderBy: { name: 'asc' }
  });

  const destinations = dbDestinations.map(d => ({
    id: d.id,
    name: d.name,
    tripCount: d._count.trips
  }));

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
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">Join other adventurers and enjoy an unforgettable journey to exotic Indonesian destinations at the best price.</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR FILTERS */}
        <Suspense fallback={<div className="w-full md:w-64 shrink-0 bg-white p-6 rounded-2xl shadow-sm h-64 animate-pulse"></div>}>
          <FilterSidebar destinations={destinations} />
        </Suspense>

        {/* TRIPS GRID */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-slate-500 text-sm">Showing <span className="font-bold text-slate-900">{trips.length}</span> Open Trips</p>
            <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.length === 0 ? (
              <p className="col-span-3 text-center text-slate-500 py-10">No Open Trips available yet.</p>
            ) : (
              trips.map((trip) => (
                <TripCard 
                  key={trip.id}
                  image={trip.featuredImage || "/hero.png"}
                  title={trip.title}
                  subtitle={`${trip.durationDays}D${trip.durationNights}N ${trip.destination?.name || 'Unknown'}`}
                  rating={trip.rating ?? 5.0}
                  reviews={trip.reviewCount ?? 0}
                  price={Number(trip.basePrice).toLocaleString('id-ID')}
                  slug={trip.slug}
                />
              ))
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
