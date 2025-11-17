import React from 'react';
import Link from 'next/link';
import { FaPhone, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white border-t border-gray-700">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo and Copyright */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer mb-2">
                <Image src="/logo.jpg" alt="HelpMame Logo" width={32} height={32} className="rounded-full" />
                <h1 className="font-bold text-lg italic text-white">HelpMame</h1>
              </div>
            </Link>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} HelpMame. Все права защищены.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-2">
              <Link href="/privacy" legacyBehavior>
                <a className="text-sm text-gray-300 hover:text-white transition-colors">Политика конфиденциальности</a>
              </Link>
              <Link href="/terms" legacyBehavior>
                <a className="text-sm text-gray-300 hover:text-white transition-colors">Пользовательское соглашение</a>
              </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            <a href="tel:+79891563549" className="text-gray-300 hover:text-pink-500 transition-colors transform hover:scale-110" aria-label="Call us">
              <FaPhone size={28} />
            </a>
            <a href="https://t.me/kamriq" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors transform hover:scale-110" aria-label="Telegram">
              <FaTelegram size={28} />
            </a>
            <a href="https://wa.me/79891563549" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-500 transition-colors transform hover:scale-110" aria-label="WhatsApp">
              <FaWhatsapp size={28} />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
