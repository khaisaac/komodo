'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Users, MapPin } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
}

export default function SearchWidget({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const [destinationId, setDestinationId] = useState('');
  const [date, setDate] = useState('2026-06-20');
  const [guests, setGuests] = useState('2');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destinationId) params.append('destinationId', destinationId);
    if (date) params.append('date', date);
    if (guests) params.append('guests', guests);

    router.push(`/trips?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-2 md:p-4 flex flex-col md:flex-row items-center gap-2 md:gap-4 border border-slate-100">
      <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-slate-200">
        <label className="block text-xs font-semibold text-slate-500 mb-1">Destination</label>
        <div className="flex items-center gap-2 text-slate-700">
          <MapPin className="w-5 h-5 text-slate-400" />
          <select 
            className="w-full bg-transparent outline-none font-medium text-slate-900 appearance-none cursor-pointer"
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
          >
            <option value="">All Destinations</option>
            {destinations.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
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
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 w-full px-4 py-2">
        <label className="block text-xs font-semibold text-slate-500 mb-1">Guests</label>
        <div className="flex items-center gap-2 text-slate-700">
          <Users className="w-5 h-5 text-slate-400" />
          <select 
            className="w-full bg-transparent outline-none font-medium text-slate-900 appearance-none cursor-pointer"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="1">1 Person</option>
            <option value="2">2 Persons</option>
            <option value="3">3 Persons</option>
            <option value="4+">4+ Persons</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="w-full md:w-auto mt-2 md:mt-0 bg-[#0A1F44] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#112a5c] transition-colors shadow-md flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        <span>Search Trip</span>
      </button>
    </div>
  );
}
