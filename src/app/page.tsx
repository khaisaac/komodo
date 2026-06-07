import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Calendar, Users, Star, Heart, MapPin, Menu, User } from 'lucide-react';

export const metadata = {
  title: 'Sailora | Explore Komodo & Lombok by Liveaboard',
  description: 'Experience the best island adventure in Komodo and Lombok. Book your liveaboard and open trip easily with Sailora.',
};

export default function HomePage() {
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
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
               <span className="font-bold text-xl text-white">S</span>
            </div>
            <span className="font-bold text-xl tracking-wide">Sailora</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link href="/trips" className="hover:text-blue-200 transition-colors">Trips</Link>
            <Link href="/liveaboard" className="hover:text-blue-200 transition-colors">Liveaboard</Link>
            <Link href="/blog" className="hover:text-blue-200 transition-colors">Blog</Link>
            <Link href="/about" className="hover:text-blue-200 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-blue-200 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-blue-200 transition-colors">
              <Heart className="w-4 h-4" />
              Wishlist
            </button>
            <Link href="/login" className="hidden md:flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-full text-sm font-semibold hover:bg-slate-100 transition-colors">
              <User className="w-4 h-4" />
              Login
            </Link>
            <button className="md:hidden text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        <div className="relative z-10 text-center px-4 mt-[-60px]">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-md leading-tight">
            Explore Komodo & <br className="hidden md:block" /> Lombok by Liveaboard
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto drop-shadow-md">
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
        <div className="bg-white rounded-2xl shadow-xl p-2 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 border border-slate-100">
          <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-slate-200">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
            <div className="flex items-center gap-2 text-slate-700">
              <MapPin className="w-5 h-5 text-slate-400" />
              <select className="w-full bg-transparent outline-none font-medium text-slate-900 appearance-none cursor-pointer">
                <option>Komodo National Park</option>
                <option>Lombok</option>
                <option>Raja Ampat</option>
              </select>
            </div>
          </div>

          <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-slate-200">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Departure Date</label>
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-5 h-5 text-slate-400" />
              <input 
                type="date" 
                className="w-full bg-transparent outline-none font-medium text-slate-900 cursor-pointer"
                defaultValue="2026-06-20"
              />
            </div>
          </div>

          <div className="flex-1 w-full px-4 py-2">
            <label className="block text-xs font-semibold text-slate-500 mb-1">Guests</label>
            <div className="flex items-center gap-2 text-slate-700">
              <Users className="w-5 h-5 text-slate-400" />
              <select className="w-full bg-transparent outline-none font-medium text-slate-900 appearance-none cursor-pointer">
                <option>2 Persons</option>
                <option>1 Person</option>
                <option>3 Persons</option>
                <option>4+ Persons</option>
              </select>
            </div>
          </div>

          <button className="w-full md:w-auto mt-2 md:mt-0 bg-[#0A1F44] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#112a5c] transition-colors shadow-md flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            <span>Search Trip</span>
          </button>
        </div>
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
          <TripCard 
            image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
            title="Athira Deluxe Cruise"
            subtitle="4D3N Komodo"
            rating={4.8}
            reviews={120}
            price="4.250.000"
          />
          <TripCard 
            image="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=800&auto=format&fit=crop"
            title="Queen Maria"
            subtitle="3D2N Komodo"
            rating={4.9}
            reviews={85}
            price="3.750.000"
          />
          <TripCard 
            image="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop"
            title="Sea Dragon"
            subtitle="4D3N Komodo"
            rating={4.8}
            reviews={110}
            price="4.750.000"
          />
          <TripCard 
            image="https://images.unsplash.com/photo-1570789210967-2cac24afeb00?q=80&w=800&auto=format&fit=crop"
            title="Lombok Escape"
            subtitle="3D2N Lombok"
            rating={4.7}
            reviews={64}
            price="3.250.000"
          />
        </div>
      </section>
    </div>
  );
}

function TripCard({ image, title, subtitle, rating, reviews, price }: {
  image: string;
  title: string;
  subtitle: string;
  rating: number;
  reviews: number;
  price: string;
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200">
        <Image 
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-tight mb-1">{title}</h3>
            <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-amber-600">{rating}</span>
            </div>
            <span className="text-xs text-slate-400 mt-1">({reviews})</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 font-medium block">From</span>
            <span className="font-bold text-lg text-[#0A1F44]">Rp {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
