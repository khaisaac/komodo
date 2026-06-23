'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Destination {
  id: string;
  name: string;
  boatCount?: number;
}

interface FilterSidebarProps {
  destinations: Destination[];
  boatTypes: string[];
}

export default function LiveaboardFilterSidebar({ destinations, boatTypes }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const initialDestinations = searchParams.getAll('destinationId');
  const initialBoatTypes = searchParams.getAll('type');

  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(initialDestinations);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialBoatTypes);

  // Sync state if URL changes
  useEffect(() => {
    setSelectedDestinations(searchParams.getAll('destinationId'));
    setSelectedTypes(searchParams.getAll('type'));
  }, [searchParams]);

  const handleDestinationChange = (id: string) => {
    setSelectedDestinations(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    selectedDestinations.forEach(id => params.append('destinationId', id));
    selectedTypes.forEach(type => params.append('type', type));

    router.push(`/liveaboard?${params.toString()}`);
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
        <h2 className="font-bold text-lg text-slate-900 mb-6 border-b pb-4">Filter Kapal</h2>
        
        {/* Filter Group: Destination */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-3 text-sm">Destinasi Berlayar</h3>
          <div className="space-y-2">
            {destinations.map(dest => (
              <label key={dest.id} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4" 
                  checked={selectedDestinations.includes(dest.id)}
                  onChange={() => handleDestinationChange(dest.id)}
                />
                <span className="text-sm text-slate-600">{dest.name} {dest.boatCount !== undefined ? `(${dest.boatCount})` : ''}</span>
              </label>
            ))}
            {destinations.length === 0 && <p className="text-xs text-slate-400">Belum ada destinasi.</p>}
          </div>
        </div>

        {/* Filter Group: Boat Type */}
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-3 text-sm">Tipe Kapal</h3>
          <div className="space-y-2">
            {boatTypes.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                <span className="text-sm text-slate-600">{type}</span>
              </label>
            ))}
            {boatTypes.length === 0 && <p className="text-xs text-slate-400">Belum ada tipe kapal.</p>}
          </div>
        </div>

        <button 
          onClick={applyFilters}
          className="w-full bg-[#0A1F44] text-white py-2 rounded-xl text-sm font-semibold hover:bg-[#112a5c] transition-colors"
        >
          Terapkan Filter
        </button>
      </div>
    </aside>
  );
}
