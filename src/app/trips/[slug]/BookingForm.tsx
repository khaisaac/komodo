'use client';

import React, { useState } from 'react';
import { Loader2, ShieldCheck, Tag, CreditCard } from 'lucide-react';
import { processCheckout } from '@/app/actions/booking';
import { checkVoucher } from '@/app/actions/voucher';

interface BookingFormProps {
  tripId: string;
  tripTitle: string;
  pricingOptions: { name: string; price: number }[];
}

export default function BookingForm({ tripId, tripTitle, pricingOptions }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0); // index of selected pricing option
  
  // Payment & Voucher State
  const [paymentType, setPaymentType] = useState<'FULL' | 'DP_30'>('FULL');
  const [voucherCode, setVoucherCode] = useState('');
  const [voucherStatus, setVoucherStatus] = useState<{valid: boolean; message: string; discountAmount?: number; id?: string} | null>(null);
  const [checkingVoucher, setCheckingVoucher] = useState(false);

  const subtotal = pricingOptions[selectedOption]?.price || 0;
  const discountAmount = voucherStatus?.valid ? (voucherStatus.discountAmount || 0) : 0;
  const grandTotal = subtotal - discountAmount;
  const paymentAmountToday = paymentType === 'FULL' ? grandTotal : grandTotal * 0.3;

  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) return;
    setCheckingVoucher(true);
    try {
      const res = await checkVoucher(voucherCode, subtotal);
      setVoucherStatus(res);
    } catch (e) {
      setVoucherStatus({ valid: false, message: 'Gagal mengecek voucher' });
    } finally {
      setCheckingVoucher(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-[#0A1F44] p-6 text-white text-center">
        <h3 className="font-bold text-xl mb-1">Booking Form</h3>
        <p className="text-sm text-blue-200">Fill in your details below without logging in</p>
      </div>

      <form 
        action={async (formData) => {
          setLoading(true);
          try {
            formData.append('selectedPackageName', pricingOptions[selectedOption].name);
            formData.append('selectedPackagePrice', pricingOptions[selectedOption].price.toString());
            formData.append('paymentType', paymentType);
            
            if (voucherStatus?.valid && voucherStatus.id) {
              formData.append('voucherId', voucherStatus.id);
              formData.append('discountAmount', discountAmount.toString());
            }
            
            await processCheckout(formData);
          } catch (e) {
            console.error(e);
            setLoading(false);
            alert('An error occurred while processing payment. Please try again.');
          }
        }} 
        className="p-6 space-y-6"
      >
        <input type="hidden" name="tripId" value={tripId} />
        <input type="hidden" name="tripTitle" value={tripTitle} />

        {/* Pricing Options Selector */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">Select Package *</label>
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
                    onChange={() => {
                      setSelectedOption(idx);
                      setVoucherStatus(null); // Reset voucher on package change because subtotal changes
                    }}
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

        {/* Voucher Code */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Tag className="w-4 h-4 text-blue-600" />
            Have a Voucher Code?
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Enter promo code" 
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              className="flex-1 bg-white border border-slate-300 text-slate-900 rounded-lg px-4 py-2 outline-none focus:border-blue-500 text-sm uppercase" 
            />
            <button 
              type="button" 
              onClick={handleApplyVoucher}
              disabled={checkingVoucher || !voucherCode}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {checkingVoucher ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
            </button>
          </div>
          {voucherStatus && (
            <p className={`text-xs mt-2 font-medium ${voucherStatus.valid ? 'text-emerald-600' : 'text-red-600'}`}>
              {voucherStatus.message} {voucherStatus.valid && `(-Rp ${voucherStatus.discountAmount?.toLocaleString('id-ID')})`}
            </p>
          )}
        </div>

        {/* Payment Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            Payment Method
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentType === 'FULL' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 bg-white hover:border-emerald-300'}`}>
              <div className="flex items-center gap-2 mb-1">
                <input 
                  type="radio" 
                  checked={paymentType === 'FULL'}
                  onChange={() => setPaymentType('FULL')}
                  className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                />
                <span className="font-bold text-sm text-slate-900">Full Payment</span>
              </div>
              <span className="text-xs text-slate-500 ml-6">Pay 100% in full today.</span>
            </label>

            <label className={`flex flex-col p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentType === 'DP_30' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-white hover:border-amber-300'}`}>
              <div className="flex items-center gap-2 mb-1">
                <input 
                  type="radio" 
                  checked={paymentType === 'DP_30'}
                  onChange={() => setPaymentType('DP_30')}
                  className="w-4 h-4 text-amber-500 border-slate-300 focus:ring-amber-500"
                />
                <span className="font-bold text-sm text-slate-900">30% Deposit</span>
              </div>
              <span className="text-xs text-slate-500 ml-6">Remaining balance paid 7 days before departure.</span>
            </label>
          </div>
        </div>

        {/* Guest Details */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Full Name *</label>
            <input type="text" name="guestName" required placeholder="e.g. John Doe" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Active Email *</label>
            <input type="email" name="guestEmail" required placeholder="Email for ticket/invoice" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">WhatsApp Number *</label>
            <input type="tel" name="guestPhone" required placeholder="e.g. +628123456789" className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-3 outline-none focus:border-blue-500 text-sm" />
          </div>
        </div>

        {/* Total & Submit */}
        <div className="pt-6 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-6 rounded-b-2xl">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">Package Price</span>
              <span className="font-semibold text-slate-700">Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-emerald-600">Voucher Discount</span>
                <span className="font-semibold text-emerald-600">- Rp {discountAmount.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-slate-200">
              <span className="text-slate-600 font-medium">Grand Total</span>
              <span className="text-lg font-bold text-slate-900">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
            
            {paymentType === 'DP_30' && (
              <div className="flex justify-between items-center mt-2 p-3 bg-amber-100 rounded-lg">
                <span className="text-amber-800 font-bold text-sm">Today's Payment (30% Deposit)</span>
                <span className="text-xl font-bold text-amber-600">Rp {paymentAmountToday.toLocaleString('id-ID')}</span>
              </div>
            )}
            {paymentType === 'FULL' && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-slate-700 font-bold">Today's Payment</span>
                <span className="text-2xl font-bold text-[#0A1F44]">Rp {paymentAmountToday.toLocaleString('id-ID')}</span>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#0A1F44] text-white py-4 rounded-xl font-bold hover:bg-[#112a5c] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Proceed to Payment</span>}
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure Payment by DOKU Gateway</span>
          </div>
        </div>
      </form>
    </div>
  );
}
