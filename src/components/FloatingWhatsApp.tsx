import React from 'react';

export default function FloatingWhatsApp() {
  const phoneNumber = '6281916067159'; // Replaced leading 0 with Indonesia country code 62
  const message = 'Hello! I am interested in your trips and would like to know more details.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
      aria-label="Chat on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path
          fillRule="evenodd"
          d="M12 2.055c-5.523 0-10 4.477-10 10 0 1.767.458 3.424 1.26 4.887l-1.39 5.08 5.196-1.364A9.957 9.957 0 0012 22.055c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.277c-1.57 0-3.047-.406-4.336-1.116l-.312-.172-3.197.839.855-3.118-.188-.301A8.22 8.22 0 013.722 12.055c0-4.57 3.719-8.289 8.278-8.289 4.56 0 8.278 3.719 8.278 8.289 0 4.57-3.718 8.289-8.278 8.289zm4.536-6.19c-.248-.124-1.472-.727-1.7-.811-.228-.084-.395-.124-.56.124-.166.248-.644.811-.789.977-.145.166-.29.187-.538.062-.248-.124-1.052-.388-2.003-1.233-.74-.658-1.239-1.471-1.384-1.719-.145-.248-.016-.381.108-.505.112-.112.248-.29.372-.435.124-.145.166-.248.248-.414.084-.166.042-.311-.02-.435-.062-.124-.56-1.349-.768-1.847-.202-.486-.407-.42-.56-.427-.146-.007-.311-.007-.477-.007-.166 0-.435.062-.663.311-.228.248-.871.851-.871 2.073 0 1.222.892 2.404 1.016 2.57.124.166 1.753 2.674 4.244 3.748 1.954.839 2.559.768 3.036.644.534-.139 1.472-.602 1.68-1.183.208-.58.208-1.08.145-1.183-.062-.104-.228-.166-.477-.291z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}
