import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';



const Footer = () => {
    return (
        <footer className="bg-[#244D3F] text-white">

      <div className="flex flex-col items-center justify-center py-10 px-6 text-center border-b border-teal-600">

        <h2 className="text-3xl font-bold mb-2">KeenKeeper</h2>

        <p className="text-gray-200 text-sm max-w-md mb-6">
          Your personal shelf of meaningful connections. Browse, text, and nurture the relationships that matter most.
        </p>

        <p className="text-gray-200 text-xs font-semibold tracking-widest mb-4 uppercase">
          Social Links
        </p>

       <div className="flex gap-3">
  <a href="#" className="bg-white rounded-full p-2 text-black hover:bg-teal-200 transition-all duration-200">
    <FaFacebook size={16} />
  </a>
  <a href="#" className="bg-white rounded-full p-2 text-black hover:bg-teal-200 transition-all duration-200">
    <FaTwitter size={16} />
  </a>
  <a href="#" className="bg-white rounded-full p-2 text-black hover:bg-teal-200 transition-all duration-200">
    <FaInstagram size={16} />
  </a>
</div>

      </div>

      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-4 text-xs text-gray-400 gap-2">

        <p>© 2025 KeenKeeper. All rights reserved.</p>

        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">Terms of Service</Link>
          <Link href="#" className="hover:text-white transition-colors duration-200">Contact</Link>
        </div>

      </div>

    </footer>
    );
};

export default Footer;