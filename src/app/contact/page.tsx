import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Komodo Lombok Cruise',
  description: 'Contact the Komodo Lombok Cruise team for travel consultation, custom bookings, or other inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      {/* HEADER SECTION */}
      <div className="bg-[#0A1F44] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <Image 
            src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop"
            alt="Contact Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Our team is ready to help you plan your dream nautical journey. Don't hesitate to ask!
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
          
          {/* LEFT: CONTACT INFO */}
          <div className="lg:w-2/5 bg-[#0A1F44] text-white p-10 lg:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-white opacity-5"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <p className="text-slate-300 mb-12">
                Have questions about open trips, boat charters, or business partnerships? Contact us immediately.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Office Address</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Jalan Senaru Bayan, Lombok Utara</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Phone & WhatsApp</h4>
                    <p className="text-sm text-slate-300">+62 812 3456 7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Email</h4>
                    <p className="text-sm text-slate-300">hello@komodolombokcruise.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Operational Hours</h4>
                    <p className="text-sm text-slate-300">Monday - Sunday: 08:00 - 20:00 WITA</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links (Dummy icons mapped to buttons) */}
              <div className="mt-16 flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <span className="font-bold">fb</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 transition-colors">
                  <span className="font-bold">ig</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition-colors">
                  <span className="font-bold">x</span>
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="lg:w-3/5 p-10 lg:p-14">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Send a Message</h2>
            <p className="text-slate-500 mb-8">Write your message below and our team will respond within 24 hours.</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone / WhatsApp Number</label>
                  <input 
                    type="tel" 
                    placeholder="+62 812..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Purpose / Question (Subject)</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors cursor-pointer text-slate-700">
                    <option>Open Trip Booking</option>
                    <option>Liveaboard Charter (Private)</option>
                    <option>Business Partnership</option>
                    <option>Other Inquiries</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us the details of your travel plans or your questions..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button type="button" className="w-full sm:w-auto bg-[#0A1F44] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#112a5c] transition-colors shadow-lg flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  <span>Send Message Now</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* WhatsApp Floating/Banner alternative (Optional visual block) */}
        <div className="mt-12 bg-green-50 rounded-2xl border border-green-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-800 mb-1">Need a Quick Response?</h3>
              <p className="text-green-700">Chat directly with our support team via WhatsApp.</p>
            </div>
          </div>
          <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg whitespace-nowrap">
            Chat via WhatsApp
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
