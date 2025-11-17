'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart, BoardItem } from '../context/CartContext';

interface BoardItemCardProps {
  id: string;
  imageUrls: string[];
  title: string;
  price: number;
}

export default function BoardItemCard({ id, imageUrls, title, price }: BoardItemCardProps) {
  const {
    addToCart,
    removeFromCart,
    isItemInCart,
    toggleFavorite,
    isItemInFavorites
  } = useCart();

  const [currentIndex, setCurrentIndex] = useState(0);
  const validImageUrls = imageUrls && imageUrls.length > 0 ? imageUrls : ['/placeholder.jpg'];
  const hasMultipleImages = validImageUrls.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImageUrls.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImageUrls.length - 1 ? 0 : prev + 1));
  };

  const item: BoardItem = { id, imageUrls, title, price };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isItemInCart(id) ? removeFromCart(id) : addToCart(item);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item);
  };

  return (
    <Link href={`/board/${id}`} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200 h-full">
      <div className="relative group">
        <div className="w-full h-48 relative">
          <Image 
            src={validImageUrls[currentIndex]}
            alt={title} 
            layout="fill"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => { e.currentTarget.src = '/placeholder.jpg'; }}
          />
        </div>

        {hasMultipleImages && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous image"
            >
              <Image src="/icons/back.svg" alt="Назад" width={20} height={20} />
            </button>
            <button 
              onClick={handleNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next image"
            >
              <Image src="/icons/next.svg" alt="Вперед" width={20} height={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {validImageUrls.map((_, index) => (
                <span
                  key={index}
                  className={`block w-2.5 h-2.5 rounded-full transition-colors duration-200 ${currentIndex === index ? 'bg-white' : 'bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}

        <button 
          onClick={handleFavoriteClick} 
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 shadow-md transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-500 z-10"
          aria-label="Add to favorites"
        >
          <Image 
            src={isItemInFavorites(id) ? '/icons/like-2.svg' : '/icons/like-1.svg'} 
            alt="Add to favorites" 
            width={24} 
            height={24} 
          />
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow gap-2">
        <h3 className="text-base font-semibold text-gray-800 h-12 line-clamp-2">{title}</h3>
        <div className="flex-grow" />
        <p className="text-gray-900 font-bold text-lg">{price.toLocaleString('ru-RU')} руб.</p>
        
        <button 
          onClick={handleCartClick}
          className={`w-full py-2 px-4 mt-2 rounded-lg font-semibold transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 ${isItemInCart(id) ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-rose-500 text-white hover:bg-rose-600'}`}>
          {isItemInCart(id) ? 'Убрать из корзины' : 'Добавить в корзину'}
        </button>
      </div>
    </Link>
  );
}
