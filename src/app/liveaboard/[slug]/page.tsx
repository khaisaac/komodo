import React from 'react';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Users, MapPin, CheckCircle, Ship, Star } from 'lucide-react';
import GalleryGrid from '@/components/GalleryGrid';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const boat = await prisma.boat.findUnique({ where: { slug } });
  if (!boat) return { title: 'Liveaboard Not Found' };
  return { title: `${boat.name} | Komodo Lombok Cruise` };
}

export default async function LiveaboardDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const boat = await prisma.boat.findUnique({
    where: { slug },
    include: { destination: true, cabins: true }
  });

  if (!boat) {
    notFound();
  }

  const specs = boat.specifications as any || {};
  const amenities = boat.amenities as string[] || [];
  const galleryImages = boat.gallery ? (boat.gallery as string[]) : [];
  
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      {/* HERO IMAGE */}
      <div className="relative h-[400px] md:h-[500px] w-full mt-16">
        <Image 
          src={boat.featuredImage || "https://images.unsplash.com/photo-1548574505-12caf0050b5b?q=80&w=2000&auto=format&fit=crop"}
          alt={boat.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">{specs.type || 'Phinisi'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{boat.name}</h1>
          <div className="flex flex-wrap gap-6 text-sm md:text-base text-slate-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{boat.destination?.name || 'Unknown'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Up to {specs.capacity || 0} Guests</span>
            </div>
            <div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 backdrop-blur-sm">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-amber-400">{boat.rating ?? 5.0}</span>
              <span className="text-white/80 text-xs ml-1">({boat.reviewCount ?? 0} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col lg:flex-row gap-8">
        {/* LEFT COLUMN: DETAILS */}
        <div className="flex-1 lg:w-2/3">
          {galleryImages.length > 0 && <GalleryGrid images={galleryImages} />}

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Boat Description</h2>
            {boat.description ? (
              <div 
                className="prose prose-slate max-w-none text-slate-600 prose-headings:text-[#0A1F44] prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: boat.description }}
              />
            ) : (
              <p className="text-slate-600">No description available.</p>
            )}
          </div>

          {amenities.length > 0 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {boat.cabins.length > 0 && (
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Cabins</h2>
              <div className="space-y-4">
                {boat.cabins.map(cabin => (
                  <div key={cabin.id} className="p-4 border border-slate-200 rounded-xl flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full md:w-32 h-24 bg-slate-200 rounded-lg relative overflow-hidden shrink-0">
                      <Ship className="absolute inset-0 m-auto text-slate-400 w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{cabin.name}</h3>
                      <p className="text-sm text-slate-500 mb-2">Type: {cabin.type} | Capacity: {cabin.capacity} Persons</p>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: BOOKING/CHARTER INQUIRY */}
        <aside className="w-full lg:w-1/3">
          <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-xl text-[#0A1F44] mb-2">Charter Inquiry</h3>
            <p className="text-sm text-slate-500 mb-6">Contact us to charter this beautiful boat for your private group.</p>
            
            <div className="mb-6">
              <span className="text-xs text-slate-500 font-medium block">Starting from</span>
              <span className="font-bold text-2xl text-[#0A1F44]">Rp {Number(specs.basePrice || 0).toLocaleString('id-ID')}</span>
              <span className="text-sm text-slate-500"> /day</span>
            </div>

            <a 
              href={`https://wa.me/6281916067159?text=Hello%20Komodo%20Lombok%20Cruise,%20I%20am%20interested%20in%20chartering%20the%20${boat.name}.`}
              target="_blank"
              rel="noreferrer"
              className="w-full block text-center bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              Contact via WhatsApp
            </a>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}
