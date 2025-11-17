'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Определяем единый тип для товара
export interface BoardItem {
  id: string;
  imageUrls: string[];
  title: string;
  price: number;
  userId?: string;
  createdAt?: any;
}

// Определяем, какие данные и функции будет предоставлять наш контекст
interface CartContextType {
  cartItems: BoardItem[];
  favoriteItems: BoardItem[];
  addToCart: (item: BoardItem) => void;
  removeFromCart: (itemId: string) => void;
  isItemInCart: (itemId: string) => boolean;
  toggleFavorite: (item: BoardItem) => void;
  isItemInFavorites: (itemId: string) => boolean;
  cartTotal: number;
  loading: boolean; // Флаг для отслеживания загрузки данных
}

// Создаем сам контекст
const CartContext = createContext<CartContextType | undefined>(undefined);

// Создаем компонент-"провайдер"
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  
  // Состояния для корзины и избранного теперь инициализируются пустыми
  const [cartItems, setCartItems] = useState<BoardItem[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<BoardItem[]>([]);

  // --- Функции для Корзины ---
  const addToCart = (item: BoardItem) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
  };

  const removeFromCart = (itemId: string) => {
    const newCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCartItems);
  };

  const isItemInCart = (itemId: string) => cartItems.some(item => item.id === itemId);

  // --- Функции для Избранного ---
  const toggleFavorite = (item: BoardItem) => {
    let newFavoriteItems;
    if (isItemInFavorites(item.id)) {
      newFavoriteItems = favoriteItems.filter(fav => fav.id !== item.id);
    } else {
      newFavoriteItems = [...favoriteItems, item];
    }
    setFavoriteItems(newFavoriteItems);
  };

  const isItemInFavorites = (itemId: string) => favoriteItems.some(item => item.id === itemId);
  
  // Считаем общую стоимость
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      favoriteItems,
      addToCart,
      removeFromCart,
      isItemInCart,
      toggleFavorite,
      isItemInFavorites,
      cartTotal,
      loading
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Кастомный хук для доступа к контексту
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart должен использоваться внутри CartProvider');
  }
  return context;
};
