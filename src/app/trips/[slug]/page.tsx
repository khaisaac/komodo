import React from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Clock, MapPin, CheckCircle } from 'lucide-react';
import BookingForm from './BookingForm';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await prisma.trip.findUnique({ where: { slug } });
  if (!trip) return { title: 'Trip Not Found' };
  return { title: `${trip.title} | Komodo Lombok Cruise` };
}

export default async function TripDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const trip = await prisma.trip.findUnique({
    where: { slug },
  });

  if (!trip) {
    notFound();
  }

  // Parse pricingOptions
  let pricingOptions: { name: string, price: number }[] = [];
  if (trip.pricingOptions && Array.isArray(trip.pricingOptions)) {
    pricingOptions = trip.pricingOptions as { name: string, price: number }[];
  } else {
    // Fallback to basePrice if no options provided
    pricingOptions = [{ name: 'Standard Package', price: Number(trip.basePrice) }];
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      {/* HERO IMAGE */}
      <div className="relative h-[400px] md:h-[500px] w-full mt-16">
        <Image 
          src={trip.featuredImage || "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop"}
          alt={trip.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">OPEN TRIP</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{trip.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm md:text-base text-slate-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{trip.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{trip.durationDays} Hari {trip.durationNights} Malam</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: DETAILS */}
        <div className="flex-1 lg:w-2/3">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Deskripsi Perjalanan</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              {trip.description.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Just dummy inclusions for UI */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Fasilitas Termasuk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Transportasi Kapal (Cabin/AC)', 'Makan 3x Sehari', 'Peralatan Snorkeling', 'Guide Lokal Berpengalaman', 'Dokumentasi Premium', 'Air Mineral, Kopi, Teh'].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKING FORM */}
        <aside className="w-full lg:w-1/3">
          <div className="sticky top-24">
            <BookingForm 
              tripId={trip.id} 
              tripTitle={trip.title}
              pricingOptions={pricingOptions} 
            />
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
