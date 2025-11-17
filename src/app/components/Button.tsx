'use client';

import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'default' | 'red' | 'teal' | 'pink';
  className?: string; // Allow custom classes
}

export default function Button({ href, children, variant = 'default', className = '' }: ButtonProps) {
  // Base styles for all buttons
  const base = `
    px-6 py-2.5 rounded-lg font-semibold text-white text-center 
    shadow-md hover:shadow-lg 
    transform hover:-translate-y-0.5 
    transition-all duration-200 ease-in-out 
    focus:outline-none focus:ring-4
  `;

  let variantClasses;
  switch (variant) {
    case 'red':
      variantClasses = 'bg-red-600 hover:bg-red-700 focus:ring-red-300';
      break;
    case 'teal':
      variantClasses = 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-300';
      break;
    case 'pink':
    default:
      variantClasses = 'bg-pink-500 hover:bg-pink-600 focus:ring-pink-300';
      break;
  }

  // Combine all classes
  const style = `${base} ${variantClasses} ${className}`.trim();

  return <Link href={href} className={style}>{children}</Link>;
}
