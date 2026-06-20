'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export default function BookPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const data = {
      guestName: formData.get('guestName'),
      guestEmail: formData.get('guestEmail'),
      guestPhone: formData.get('guestPhone'),
      tripScheduleId: 'dummy-schedule-123', // Hardcoded for demo
      specialRequest: formData.get('specialRequest'),
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Terjadi kesalahan saat memproses pesanan.');
      }

      setSuccess(true);
    } catch (error: any) {
      setErrorMsg(error.message || 'Gagal mengirim data pemesanan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <h1 className="text-3xl font-bold text-[#0A1F44] mb-8 text-center">Formulir Pemesanan (Guest)</h1>

        {success ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-slate-100">
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Pemesanan Berhasil!</h2>
            <p className="text-slate-600 mb-8">
              Terima kasih. Detail pesanan dan instruksi pembayaran telah dikirimkan ke email Anda. Silakan cek kotak masuk (atau folder spam) Anda.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-[#0A1F44] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100">
            {errorMsg && (
              <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3 mb-8 border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{errorMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-slate-100 pb-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Informasi Pemesan</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap *</label>
                    <input 
                      type="text" 
                      name="guestName"
                      required
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Email *</label>
                    <input 
                      type="email" 
                      name="guestEmail"
                      required
                      placeholder="email@example.com (Untuk pengiriman invoice & tiket)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                    <p className="text-xs text-slate-500 mt-2">Pastikan email aktif agar dapat menerima notifikasi pemesanan.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon / WhatsApp *</label>
                    <input 
                      type="tel" 
                      name="guestPhone"
                      required
                      placeholder="+62 8..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Permintaan Khusus (Opsional)</label>
                <textarea 
                  name="specialRequest"
                  rows={4}
                  placeholder="Alergi makanan, kebutuhan khusus, dll."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-6">
                <strong>Catatan:</strong> Dengan melanjutkan pemesanan, Anda menyetujui Syarat & Ketentuan dari Komodo Lombok Cruise.
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0A1F44] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#112a5c] transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses Pesanan...</span>
                  </>
                ) : (
                  <span>Konfirmasi Pesanan</span>
                )}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
