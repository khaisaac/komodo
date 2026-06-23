import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | Komodo Lombok Cruise',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      <div className="bg-[#0A1F44] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Komodo Lombok Cruise. By accessing our website and booking our services, you agree to comply with and be bound by the following terms and conditions of use. Please read these terms carefully before making a reservation.
          </p>

          <h2>2. Booking and Payments</h2>
          <p>
            To secure your booking for any Open Trip or Private Liveaboard charter, a down payment (deposit) of at least 30% is required. The remaining balance must be paid in full prior to the departure date as specified in your invoice. Payments can be made via bank transfer or other approved methods.
          </p>

          <h2>3. Cancellations and Refunds</h2>
          <p>
            Cancellations must be requested in writing. Depending on the timing of your cancellation, the following refund policies generally apply:
          </p>
          <ul>
            <li>Cancellations made more than 30 days prior to departure: 50% refund of the deposit.</li>
            <li>Cancellations made between 15 to 30 days prior to departure: No refund of the deposit.</li>
            <li>Cancellations made less than 15 days prior to departure or "no-shows": 100% cancellation fee (no refund).</li>
          </ul>
          <p>
            Komodo Lombok Cruise reserves the right to cancel a trip due to bad weather, natural disasters, or other unforeseeable circumstances (force majeure). In such cases, guests will be offered alternative dates or a full refund.
          </p>

          <h2>4. Travel Requirements and Insurance</h2>
          <p>
            Guests are responsible for ensuring they have valid travel documents, including passports and visas if applicable. We highly recommend that all guests purchase comprehensive travel insurance that covers medical expenses, trip cancellations, and personal belongings.
          </p>

          <h2>5. Itinerary Changes</h2>
          <p>
            While we strive to adhere strictly to our published itineraries, the Captain of the vessel reserves the right to alter the route or schedule depending on sea conditions, weather, or safety concerns. The safety of our guests and crew is always our top priority.
          </p>

          <h2>6. Liability</h2>
          <p>
            Komodo Lombok Cruise shall not be liable for any injury, loss, damage, or delay caused by events beyond our control, including but not limited to natural disasters, weather conditions, mechanical breakdowns, or actions of third parties.
          </p>

          <h2>7. Contact Information</h2>
          <p>
            If you have any questions or concerns regarding these Terms of Service, please contact us at: <br/>
            <strong>Email:</strong> hello@komodolombokcruise.com <br/>
            <strong>Phone:</strong> +62 812 3456 7890
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
