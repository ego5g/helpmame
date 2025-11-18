'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AuthButtons from './AuthButtons';
import { useCart } from '../context/CartContext';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { cartTotal } = useCart();
  const [clientCartTotal, setClientCartTotal] = useState(0);

  useEffect(() => {
    setClientCartTotal(cartTotal);
  }, [cartTotal]);

  const navLinkClass = "hover:text-gray-200 transition-colors duration-200 px-4";

  const navLinks = [
      { href: "/", label: "Главная" },
      { href: "/consultation", label: "Консультация" },
      { href: "/urgent", label: "Срочная помощь" },
      { href: "/specialist-call", label: "Вызов на дом" },
      { href: "/services", label: "Услуги и Цены" },
      { href: "/discharge", label: "К выписке" },
      { href: "/board", label: "Доска объявлений" },
      { href: "/forum", label: "Форум" },
      { href: "/articles", label: "Статьи" },
  ];

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

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

      <div className="flex-grow mx-4 overflow-hidden">
        <Slider {...sliderSettings}>
          {navLinks.map((link, index) => (
            <div key={index}>
              <Link href={link.href} className={navLinkClass} onClick={() => setIsOpen(false)}>{link.label}</Link>
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6">
            {cartLink}
            <AuthButtons />
        </div>

        <div className="flex items-center md:hidden gap-4">
            {cartLink}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-rose-500 transition-colors duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
                </svg>
            </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-rose-400 shadow-lg">
            <div className="bg-rose-300 mt-2 mx-2 rounded-md">
                <ul className="flex flex-col items-center gap-4 p-4 font-medium">
                  {navLinks.map((link, index) => (
                    <li key={index}><Link href={link.href} className={navLinkClass} onClick={() => setIsOpen(false)}>{link.label}</Link></li>
                  ))}
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
