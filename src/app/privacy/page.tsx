import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | Komodo Lombok Cruise',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar transparent={false} />

      <div className="bg-[#0A1F44] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 prose prose-slate max-w-none">
          <h2>1. Introduction</h2>
          <p>
            At Komodo Lombok Cruise, we are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you visit our website or book our services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when booking a trip, subscribing to our newsletter, or contacting us. This information may include:
          </p>
          <ul>
            <li>Name and contact details (email address, phone number).</li>
            <li>Passport details, nationality, and date of birth (required for national park permits).</li>
            <li>Dietary preferences or medical conditions relevant to your safety onboard.</li>
            <li>Payment and transaction details.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            The information we collect is used primarily to fulfill our services to you, including:
          </p>
          <ul>
            <li>Processing your bookings and coordinating your itinerary.</li>
            <li>Communicating with you regarding your trip details, updates, or changes.</li>
            <li>Arranging necessary permits with the National Park authorities.</li>
            <li>Improving our website and customer service.</li>
            <li>Sending marketing communications (only if you have opted in).</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>
            We do not sell or rent your personal information to third parties. We may share your data with trusted partners strictly for the purpose of fulfilling your trip requirements (e.g., boat operators, national park rangers, or payment processors). We may also disclose information if required by law.
          </p>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please be aware that no transmission of data over the internet is 100% secure.
          </p>

          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience, analyze site traffic, and understand where our audience comes from. You can choose to disable cookies through your browser settings, though this may affect site functionality.
          </p>

          <h2>7. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please reach out to us at: <br/>
            <strong>Email:</strong> privacy@komodolombokcruise.com <br/>
            <strong>Phone:</strong> +62 812 3456 7890
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
