'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is an Open Trip?",
    answer: "An Open Trip is a shared group tour where you join other travelers on a set schedule. It's a great way to meet new people and reduce costs, as the expenses are shared among all participants."
  },
  {
    question: "What is a Liveaboard?",
    answer: "Liveaboard means you will live on the boat for the duration of the trip. You will sleep, eat, and travel between islands on the vessel. It's a unique nautical experience perfect for island hopping in Komodo."
  },
  {
    question: "How do I book a trip?",
    answer: "You can easily book a trip by selecting your desired package from the 'Open Trips' or 'Liveaboard' menu, clicking 'Book Now', and filling out the reservation form. Our team will contact you shortly to process the payment."
  },
  {
    question: "Is the flight ticket included in the price?",
    answer: "No, flight tickets are not included in our tour packages. Guests are responsible for arranging their own flights to and from the meeting point (usually Labuan Bajo or Lombok)."
  },
  {
    question: "What should I bring for the trip?",
    answer: "We recommend bringing comfortable clothing, swimwear, sunscreen, a hat, sunglasses, personal medication, some cash (for tipping or local purchases), and your camera. Towels and basic snorkeling gear are usually provided."
  },
  {
    question: "Can I charter a private boat?",
    answer: "Yes, you can! We offer private charters for families, couples, or private groups. You can choose your own dates, itinerary, and preferred boat. Contact our team via WhatsApp or the Contact page for a custom quote."
  },
  {
    question: "Is there a vegetarian or special diet menu available?",
    answer: "Absolutely. Please inform us about any dietary restrictions or allergies at the time of booking so our onboard chef can prepare suitable meals for you."
  }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors focus:outline-none"
      >
        <h3 className="text-lg font-bold text-slate-900 pr-8">{question}</h3>
        <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown className="w-5 h-5 text-slate-600" />
        </div>
      </button>
      
      <div 
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      {/* HEADER SECTION */}
      <div className="bg-[#0A1F44] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image 
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=2000&auto=format&fit=crop"
            alt="FAQ Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our trips, booking process, and what to expect during your nautical adventure.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <a href="/contact" className="inline-block bg-[#0A1F44] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#112a5c] transition-colors shadow-lg">
            Contact Support
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
