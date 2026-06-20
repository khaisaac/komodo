import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Heart, Shield, Anchor } from 'lucide-react';

export const metadata = {
  title: 'About Us | Komodo Lombok Cruise',
  description: 'Kenali lebih dekat Komodo Lombok Cruise, penyedia layanan perjalanan bahari terbaik di Indonesia.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      {/* HEADER SECTION */}
      <div className="bg-[#0A1F44] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image 
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop"
            alt="Komodo Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">About Us</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Membawa Anda mengarungi keindahan lautan Nusantara dengan pengalaman berlayar yang tak terlupakan, aman, dan penuh petualangan.
          </p>
        </div>
      </div>

      {/* OUR STORY SECTION */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-[#0A1F44]">Cerita Perjalanan Kami</h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Berawal dari kecintaan yang mendalam terhadap kekayaan bahari Indonesia, <strong className="text-slate-900">Komodo Lombok Cruise</strong> didirikan dengan satu misi: mempermudah setiap orang untuk menikmati pesona Kepulauan Komodo, Lombok, dan destinasi luar biasa lainnya.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Kami bekerja sama dengan puluhan pemilik kapal phinisi lokal dan operator tur terpercaya untuk menghadirkan paket Open Trip dan Private Charter (Liveaboard) dengan kualitas premium, keamanan terjamin, dan harga yang transparan.
            </p>
          </div>
          <div className="flex-1 relative">
            <div className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Anchor className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-bold text-2xl text-slate-900">10+ Tahun</p>
                  <p className="text-sm text-slate-500 font-medium">Pengalaman Berlayar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#0A1F44] mb-16">Nilai Utama Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-4">Pengalaman Otentik</h3>
              <p className="text-slate-600 leading-relaxed">
                Kami merancang itinerary yang tidak hanya mengunjungi spot populer, tapi juga membawa Anda merasakan keaslian alam dan budaya lokal.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-4">Keselamatan Utama</h3>
              <p className="text-slate-600 leading-relaxed">
                Armada kapal yang kami kurasi telah lulus standar keselamatan yang ketat, dikapteni oleh kru profesional yang berpengalaman di perairan lokal.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-4">Pelayanan Sepenuh Hati</h3>
              <p className="text-slate-600 leading-relaxed">
                Kami percaya keramahan adalah kunci kenyamanan. Tim support dan pemandu wisata kami siap melayani Anda 24/7 bagaikan keluarga sendiri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0A1F44] mb-6">Siap Memulai Petualangan Anda?</h2>
          <p className="text-lg text-slate-600 mb-10">Temukan paket perjalanan impian Anda hari ini dan ciptakan kenangan yang tak terlupakan bersama Komodo Lombok Cruise.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/trips" className="bg-[#0A1F44] text-white px-8 py-4 rounded-full font-bold hover:bg-[#112a5c] transition-colors shadow-lg">
              Lihat Open Trip
            </a>
            <a href="/contact" className="bg-white text-[#0A1F44] border-2 border-[#0A1F44] px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition-colors shadow-lg">
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
