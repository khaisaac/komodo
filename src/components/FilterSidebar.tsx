'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Destination {
  id: string;
  name: string;
  tripCount?: number;
}

interface FilterSidebarProps {
  destinations: Destination[];
}

export default function FilterSidebar({ destinations }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const initialDestinations = searchParams.getAll('destinationId');
  const initialDurations = searchParams.getAll('durationDays');

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(initialDestinations);
  const [selectedDurations, setSelectedDurations] = useState<string[]>(initialDurations);

  // Sync state if URL changes (e.g. from back/forward navigation)
  useEffect(() => {
    setSelectedDestinations(searchParams.getAll('destinationId'));
    setSelectedDurations(searchParams.getAll('durationDays'));
  }, [searchParams]);

  const handleDestinationChange = (id: string) => {
    setSelectedDestinations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleDurationChange = (days: string) => {
    setSelectedDurations(prev => 
      prev.includes(days) ? prev.filter(d => d !== days) : [...prev, days]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    // Also preserve other params if we had them (like date, guests from SearchWidget)
    const existingDate = searchParams.get('date');
    if (existingDate) params.append('date', existingDate);
    
    const existingGuests = searchParams.get('guests');
    if (existingGuests) params.append('guests', existingGuests);

    selectedDestinations.forEach(id => params.append('destinationId', id));
    selectedDurations.forEach(days => params.append('durationDays', days));

    router.push(`/trips?${params.toString()}`);
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
        <h2 className="font-bold text-lg text-slate-900 mb-6 border-b pb-4">Filter Trips</h2>
        
        {/* Filter Group: Destination */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-3 text-sm">Destinations</h3>
          <div className="space-y-2">
            {destinations.map(dest => (
              <label key={dest.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" 
                  checked={selectedDestinations.includes(dest.id)}
                  onChange={() => handleDestinationChange(dest.id)}
                />
                <span className="text-sm text-slate-600">{dest.name} {dest.tripCount !== undefined ? `(${dest.tripCount})` : ''}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter Group: Duration */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-3 text-sm">Duration</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                checked={selectedDurations.includes("1")}
                onChange={() => handleDurationChange("1")}
              />
              <span className="text-sm text-slate-600">1 Day (Day Trip)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                checked={selectedDurations.includes("3")}
                onChange={() => handleDurationChange("3")}
              />
              <span className="text-sm text-slate-600">3 Days 2 Nights</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                checked={selectedDurations.includes("4")}
                onChange={() => handleDurationChange("4")}
              />
              <span className="text-sm text-slate-600">4 Days 3 Nights</span>
            </label>
          </div>
        </div>

        <button 
          onClick={applyFilters}
          className="w-full bg-[#0A1F44] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#112a5c] transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
