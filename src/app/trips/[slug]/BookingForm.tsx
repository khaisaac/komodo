'use client';

import React, { useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { processCheckout } from '@/app/actions/booking';

interface BookingFormProps {
  tripId: string;
  tripTitle: string;
  pricingOptions: { name: string; price: number }[];
}

export default function BookingForm({ tripId, tripTitle, pricingOptions }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0); // index of selected pricing option

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-[#0A1F44] p-6 text-white text-center">
        <h3 className="font-bold text-xl mb-1">Booking Form</h3>
        <p className="text-sm text-blue-200">Isi data di bawah tanpa perlu login</p>
      </div>

      <form 
        action={async (formData) => {
          setLoading(true);
          try {
            // we manually append the selected package name and price because it's a radio/state
            formData.append('selectedPackageName', pricingOptions[selectedOption].name);
            formData.append('selectedPackagePrice', pricingOptions[selectedOption].price.toString());
            
            // This Server Action will redirect to DOKU URL
            await processCheckout(formData);
          } catch (e) {
            console.error(e);
            setLoading(false);
            alert('Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.');
          }
        }} 
        className="p-6 space-y-6"
      >
        <input type="hidden" name="tripId" value={tripId} />
        <input type="hidden" name="tripTitle" value={tripTitle} />

        {/* Pricing Options Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Pilih Paket *</label>
          <div className="space-y-3">
            {pricingOptions.map((option, idx) => (
              <label 
                key={idx} 
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOption === idx ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-blue-300'}`}
              >
                <div className="flex items-center gap-3">
                  <input 
                    type="radio" 
                    name="packageIndex" 
                    value={idx} 
                    checked={selectedOption === idx}
                    onChange={() => setSelectedOption(idx)}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className={`font-semibold ${selectedOption === idx ? 'text-blue-900' : 'text-slate-700'}`}>{option.name}</span>
                </div>
                <span className={`font-bold ${selectedOption === idx ? 'text-blue-700' : 'text-slate-900'}`}>
                  Rp {option.price.toLocaleString('id-ID')}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Guest Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Lengkap *</label>
            <input type="text" name="guestName" required placeholder="Misal: John Doe" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Email Aktif *</label>
            <input type="email" name="guestEmail" required placeholder="Email untuk tiket/invoice" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Nomor WhatsApp *</label>
            <input type="tel" name="guestPhone" required placeholder="Misal: 08123456789" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-sm" />
          </div>
        </div>

        {/* Total & Submit */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-600 font-medium">Total Pembayaran</span>
            <span className="text-2xl font-bold text-[#0A1F44]">
              Rp {pricingOptions[selectedOption]?.price.toLocaleString('id-ID')}
            </span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0A1F44] text-white py-4 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Lanjut ke Pembayaran</span>}
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Pembayaran Aman DOKU Payment Gateway</span>
          </div>
        </div>
      </form>
    </div>
  );
}
