import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ bookingCode?: string }> }) {
  const params = await searchParams;
  const bookingCode = params.bookingCode || 'TIDAK-DIKETAHUI';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />
      
      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Berhasil (Test)</h1>
          <p className="text-slate-500 mb-6">
            Kredensial DOKU belum dipasang di .env, jadi sistem otomatis mengarahkan Anda ke halaman ini.
            Di versi aslinya, Anda harusnya diarahkan ke halaman pembayaran DOKU.
          </p>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-8">
            <span className="block text-xs text-slate-500 mb-1">Kode Booking Anda:</span>
            <span className="font-bold text-xl text-blue-600">{bookingCode}</span>
          </div>

          <Link href="/" className="block w-full bg-[#0A1F44] text-white py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
