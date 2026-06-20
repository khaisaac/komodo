import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ArrowLeft, CreditCard, Calendar, User, FileText, CheckCircle, Clock, XCircle } from 'lucide-react';

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      schedule: {
        include: {
          trip: true,
          boat: true
        }
      },
      user: true
    }
  });

  if (!booking) {
    notFound();
  }

  const customerName = booking.user?.name || booking.guestName || 'Guest Unknown';
  const customerEmail = booking.user?.email || booking.guestEmail || '-';
  const customerPhone = booking.user?.phone || booking.guestPhone || '-';
  const customerNationality = booking.user?.nationality || booking.guestNationality || '-';
  
  const itemName = booking.schedule?.trip?.title || booking.schedule?.boat?.name || 'Paket Tidak Diketahui';
  const itemType = booking.schedule?.trip ? 'Open Trip' : (booking.schedule?.boat ? 'Liveaboard / Charter' : 'Unknown');
  const startDate = booking.schedule?.startDate ? new Date(booking.schedule.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'}) : '-';
  const endDate = booking.schedule?.endDate ? new Date(booking.schedule.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric'}) : '-';

  // Status styling
  let StatusIcon = Clock;
  let statusColor = "bg-amber-100 text-amber-700 border-amber-200";
  
  if (booking.status === "PAID") {
    StatusIcon = CheckCircle;
    statusColor = "bg-green-100 text-green-700 border-green-200";
  } else if (booking.status === "CANCELLED") {
    StatusIcon = XCircle;
    statusColor = "bg-red-100 text-red-700 border-red-200";
  } else if (booking.status === "COMPLETED") {
    StatusIcon = CheckCircle;
    statusColor = "bg-blue-100 text-blue-700 border-blue-200";
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/admin/bookings" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            Detail Pesanan
            <span className={`text-sm px-3 py-1 rounded-full border font-semibold flex items-center gap-1.5 ${statusColor}`}>
              <StatusIcon className="w-4 h-4" />
              {booking.status}
            </span>
          </h1>
          <p className="text-slate-500 mt-1">Booking ID: <span className="font-mono text-slate-900 font-medium">{booking.bookingCode}</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Trip Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Informasi Paket / Trip
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-slate-500">Nama Paket</div>
                <div className="text-lg font-semibold text-slate-900">{itemName}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-500">Tipe Pesanan</div>
                  <div className="font-medium text-slate-900">{itemType}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">Jumlah Peserta</div>
                  <div className="font-medium text-slate-900">{booking.paxCount} Orang</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">Tanggal Keberangkatan</div>
                  <div className="font-medium text-slate-900">{startDate}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">Tanggal Kepulangan</div>
                  <div className="font-medium text-slate-900">{endDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Informasi Pemesan
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-slate-500">Nama Lengkap</div>
                <div className="font-medium text-slate-900">{customerName}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">Email</div>
                <div className="font-medium text-slate-900">{customerEmail}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">Nomor Telepon</div>
                <div className="font-medium text-slate-900">{customerPhone}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-500">Kewarganegaraan</div>
                <div className="font-medium text-slate-900">{customerNationality}</div>
              </div>
            </div>
            {booking.specialRequests && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Permintaan Khusus (Special Requests)</div>
                <p className="text-slate-800 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {booking.specialRequests}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Payment & Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Ringkasan Pembayaran
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Harga Paket ({booking.paxCount}x)</span>
                <span className="font-medium text-slate-900">Rp {Number(booking.totalPrice).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Fee Platform / Tax</span>
                <span className="font-medium text-slate-900">Rp 0</span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-900">Total Tagihan</span>
                <span className="font-bold text-xl text-blue-600">Rp {Number(booking.grandTotal).toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gateway Info (DOKU)</div>
              <div className="text-sm flex justify-between">
                <span className="text-slate-500">Invoice ID</span>
                <span className="font-medium font-mono text-slate-900">{booking.paymentId || '-'}</span>
              </div>
              <div className="text-sm flex justify-between">
                <span className="text-slate-500">Metode</span>
                <span className="font-medium text-slate-900">{booking.paymentMethod || '-'}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0A1F44] text-white rounded-2xl shadow-sm p-6 text-center">
            <FileText className="w-8 h-8 mx-auto text-white/70 mb-3" />
            <h3 className="font-bold mb-2">Kelola Pesanan</h3>
            <p className="text-sm text-slate-300 mb-4">Ubah status pesanan secara manual jika ada pembayaran *offline*.</p>
            <div className="space-y-2">
              <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 rounded-xl transition-colors text-sm">Tandai PAID</button>
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white py-2 rounded-xl transition-colors text-sm">Batalkan Pesanan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
