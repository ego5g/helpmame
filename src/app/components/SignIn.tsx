'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.307 9.87C34.666 6.556 29.63 4.5 24 4.5 13.438 4.5 4.5 13.438 4.5 24S13.438 43.5 24 43.5c10.025 0 18.23-7.524 19.611-17.417z"></path>
        <path fill="#FF3D00" d="M43.611 20.083L43.595 20.083C43.595 20.083 43.611 20.083 43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.494 6.494C42.373 36.545 44 32.227 44 27.5c0-3.316-.168-6.446-.389-9.417L43.611 20.083z"></path>
        <path fill="#4CAF50" d="M24 43.5c5.166 0 9.776-1.789 13.04-4.787l-6.494-6.494c-2.008 1.521-4.542 2.453-7.546 2.453-4.522 0-8.38-2.731-9.94-6.522l-6.57 6.57C7.942 39.544 15.336 43.5 24 43.5z"></path>
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.494 6.494C42.373 36.545 44 32.227 44 27.5c0-3.316-.168-6.446-.389-9.417L43.611 20.083z"></path>
    </svg>
);

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { emailSignIn, googleSignIn } = useAuth();
  const router = useRouter();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await emailSignIn(email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Вход в аккаунт</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleEmailSubmit} className="space-y-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Электронная почта</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-pink-300">
          Войти
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="flex-shrink mx-4 text-sm text-gray-400">Или продолжить с</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>

      <button 
        onClick={handleGoogleSignIn} 
        className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-gray-200">
          <GoogleIcon />
          Войти через Google
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        Нет аккаунта? <Link href="/signup" className="text-pink-500 hover:underline font-medium">Зарегистрироваться</Link>
      </p>
    </div>
  );
}
