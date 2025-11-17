'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AuthButtons from './AuthButtons';
import { useCart } from '../context/CartContext'; // Импортируем наш хук

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { cartTotal } = useCart();
  const [clientCartTotal, setClientCartTotal] = useState(0);

  useEffect(() => {
    // This ensures the cart total is only rendered on the client, avoiding hydration mismatches.
    setClientCartTotal(cartTotal);
  }, [cartTotal]);

  // Base class for nav links for easy styling and maintenance
  const navLinkClass = "hover:text-gray-200 transition-colors duration-200";

  const navLinks = (
    <>
      <li><Link href="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Главная</Link></li>
      <li><Link href="/consultation" className={navLinkClass} onClick={() => setIsOpen(false)}>Консультация</Link></li>
      <li><Link href="/urgent" className={navLinkClass} onClick={() => setIsOpen(false)}>Срочная помощь</Link></li>
      <li><Link href="/specialist-call" className={navLinkClass} onClick={() => setIsOpen(false)}>Вызов на дом</Link></li>
      <li><Link href="/services" className={navLinkClass} onClick={() => setIsOpen(false)}>Услуги и Цены</Link></li>
      <li><Link href="/discharge" className={navLinkClass} onClick={() => setIsOpen(false)}>К выписке</Link></li>
      <li><Link href="/board" className={navLinkClass} onClick={() => setIsOpen(false)}>Доска объявлений</Link></li>
      <li><Link href="/forum" className={navLinkClass} onClick={() => setIsOpen(false)}>Форум</Link></li>
      <li><Link href="/articles" className={navLinkClass} onClick={() => setIsOpen(false)}>Статьи</Link></li>
    </>
  );

  const cartLink = (
    <Link href="/cart" className="flex items-center space-x-2 hover:text-gray-200 transition-colors" onClick={() => setIsOpen(false)}>
        <Image src="/icons/cart.svg" alt="Корзина" width={24} height={24} />
        {clientCartTotal > 0 && (
            <span className="font-bold text-sm min-w-[50px]">{clientCartTotal.toLocaleString('ru-RU')} руб.</span>
        )}
    </Link>
  );

  return (
    <nav className="bg-rose-400 text-white px-4 py-3 flex justify-between items-center relative z-30 shadow-lg">
      {/* Left section: Back button and Logo */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {pathname !== '/' && (
          <button onClick={() => router.back()} className="p-2 rounded-full hover:bg-rose-500 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
                <Image src="/logo.jpg" alt="HelpMame Logo" width={40} height={40} className="rounded-full" />
                <h1 className="font-bold text-xl italic">HelpMame</h1>
            </div>
        </Link>
      </div>

      {/* Right section: Links and actions */}
      <div className="flex items-center gap-6">
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-x-6 font-medium">
          {navLinks}
        </ul>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
            {cartLink}
            <AuthButtons />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center md:hidden gap-4">
            {cartLink}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-rose-500 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
                </svg>
            </button>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-rose-400 shadow-lg">
            <div className="bg-rose-300 mt-2 mx-2 rounded-md">
                <ul className="flex flex-col items-center gap-4 p-4 font-medium">
                  {navLinks}
                </ul>
                <div className="p-4 border-t border-white/20 flex flex-col items-center gap-4">
                    <AuthButtons />
                </div>
            </div>
        </div>
      )}
    </nav>
  );
}
