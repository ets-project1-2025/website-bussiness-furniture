// src/lib/nextjs-shim/head.tsx
// Adapter untuk komponen Head dari Next.js agar kompatibel dengan Astro
import React from 'react';

interface HeadProps {
  children: React.ReactNode;
}

const Head: React.FC<HeadProps> = ({ children }) => {
  // Dalam Astro, Head ditangani secara otomatis
  // Kita hanya perlu mengembalikan children tanpa rendering
  return null;
};

export default Head;