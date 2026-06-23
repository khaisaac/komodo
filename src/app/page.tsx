import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, Users, MapPin, ShieldCheck, Zap, Lock, Headphones, ArrowRight } from 'lucide-react';
import TripCard from '@/components/TripCard';
import LiveaboardCard from '@/components/LiveaboardCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchWidget from '@/components/SearchWidget';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Komodo Lombok Cruise | Explore Komodo & Lombok by Liveaboard',
  description: 'Experience the best island adventure in Komodo and Lombok. Book your liveaboard and open trip easily with Komodo Lombok Cruise.',
};

export default async function HomePage() {
  let openTrips: any[] = [];
  let boats: any[] = [];
  let blogs: any[] = [];
  let destinations: any[] = [];

  try {
    openTrips = await prisma.trip.findMany({
      where: { type: 'OPEN_TRIP', status: 'PUBLISHED' },
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { destination: true }
    });

    boats = await prisma.boat.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    });

    blogs = await prisma.blog.findMany({
      where: { status: 'PUBLISHED' },
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: { category: true }
    });

    destinations = await prisma.destination.findMany({
      orderBy: { name: 'asc' }
    });
  } catch (err) {
    console.error("Database connection error on homepage:", err);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO SECTION */}
      <section className="relative h-[600px] md:h-[700px] w-full flex flex-col items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=2000&auto=format&fit=crop"
            alt="Komodo Liveaboard"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
        </div>

        {/* Navbar (Transparent Overlay) */}
        <Navbar transparent={true} />

        <div className="relative z-10 text-center px-4 mt-[-60px]">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md leading-tight">
            Explore Komodo & <br className="hidden md:block" /> Lombok by Liveaboard
          </h1>
          <p className="hidden md:block text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
            Experience the best island adventure with our curated selection of luxury phinisi and comfortable open trips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/trips" className="bg-white text-slate-900 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors shadow-lg">
              Explore Trips
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors shadow-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* SEARCH WIDGET (Floating) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-16 md:-mt-12">
        <SearchWidget destinations={destinations} />
      </div>

      {/* POPULAR TRIPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-[#0A1F44]">Popular Trips</h2>
          <Link href="/trips" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {openTrips.length === 0 ? (
            <p className="col-span-4 text-center text-slate-500">No Open Trips available yet.</p>
          ) : (
            openTrips.map((trip) => (
              <TripCard 
                key={trip.id}
                image={trip.featuredImage || "/hero.png"}
                title={trip.title}
                subtitle={`${trip.durationDays}D${trip.durationNights}N ${trip.destination?.name || 'Unknown Destination'}`}
                rating={trip.rating ?? 5.0}
                reviews={trip.reviewCount ?? 0}
                price={Number(trip.basePrice).toLocaleString('id-ID')}
                slug={trip.slug}
              />
            ))
          )}
        </div>
      </section>

      {/* FEATURED LIVEABOARDS SECTION */}
      <section className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#0A1F44] mb-2">Luxury Liveaboards</h2>
              <p className="text-slate-500">Sail in style using our curated fleet of luxury phinisi.</p>
            </div>
            <Link href="/liveaboard" className="hidden md:block bg-white text-[#0A1F44] border border-slate-200 px-6 py-2 rounded-full font-semibold hover:bg-slate-50 transition-colors">
              Explore Boats
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {boats.length === 0 ? (
              <p className="col-span-3 text-center text-slate-500">No Liveaboards available yet.</p>
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
          
          <button className="w-full mt-8 md:hidden bg-white text-[#0A1F44] border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
            Explore All Boats
          </button>
        </div>
      </section>

      {/* WHY BOOK WITH US SECTION */}
      <section className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A1F44] mb-4">Why Choose Komodo Lombok Cruise?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We are committed to providing the best, easiest, and most secure booking experience for your liveaboard and open trip adventures.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8 text-blue-600" />}
              title="Best Price Guarantee"
              description="Get the best price for every trip with no hidden fees."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-amber-500" />}
              title="Instant Confirmation"
              description="Quick & easy booking with instant confirmation directly to your email."
            />
            <FeatureCard 
              icon={<Lock className="w-8 h-8 text-emerald-500" />}
              title="Secure Payment"
              description="Encrypted and secure payments with various reliable payment methods."
            />
            <FeatureCard 
              icon={<Headphones className="w-8 h-8 text-purple-500" />}
              title="24/7 Customer Support"
              description="Our dedicated support team is ready to help you whenever you need."
            />
          </div>
        </div>
      </section>

      {/* LATEST BLOG / ARTICLES SECTION */}
      <section className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#0A1F44] mb-2">Travel Guides & Tips</h2>
              <p className="text-slate-500">A collection of stories, travel guides, and holiday tips for Komodo & Lombok.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 hover:underline">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.length === 0 ? (
              <p className="col-span-3 text-center text-slate-500">No articles published yet.</p>
            ) : (
              blogs.map((blog) => {
                // simple strip html for excerpt
                const excerpt = blog.content.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...';
                
                return (
                  <Link key={blog.id} href={`/blog/${blog.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-200">
                      <Image 
                        src={blog.thumbnail || "https://images.unsplash.com/photo-1512100356356-de1b84283e18?q=80&w=800&auto=format&fit=crop"}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">{blog.category?.name || 'Article'}</div>
                      <h3 className="font-bold text-lg text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{excerpt}</p>
                      <div className="mt-auto text-xs text-slate-400 font-medium">{new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})}</div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          <button className="w-full mt-8 md:hidden bg-white text-[#0A1F44] border border-slate-200 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
            View All Articles
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-[#F8FAFC] rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
