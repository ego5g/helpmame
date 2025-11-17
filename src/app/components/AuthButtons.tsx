'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

export default function AuthButtons() {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut();
    // Optionally, redirect to home or login page after logout
    // window.location.href = '/';
  };

  // Optimized for both mobile and desktop views
  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <Link href="/profile" title="Перейти в профиль">
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md hover:bg-pink-600 transition-colors cursor-pointer">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'P'}
            </div>
          </Link>
          <button 
            onClick={handleLogout}
            className="hidden sm:block bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Выйти
          </button>
        </>
      ) : (
        <>
          {/* Using custom Button component for consistency, assuming it exists */}
          <Link href="/login" className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 transform hover:-translate-y-0.5">
            Войти
          </Link>
        </>
      )}
    </div>
  );
}
