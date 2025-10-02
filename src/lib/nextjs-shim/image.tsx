// src/lib/nextjs-shim/image.tsx
// Adapter untuk komponen Image dari Next.js agar kompatibel dengan Astro
import React from 'react';
import type { CSSProperties } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  layout?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  [key: string]: any;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  layout,
  objectFit,
  ...props 
}) => {
  const style: CSSProperties = {
    ...(layout === 'fill' ? { position: 'absolute', inset: 0 } : {}),
    ...(objectFit ? { objectFit } : {}),
    ...(width ? { width } : {}),
    ...(height ? { height } : {})
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      style={style}
      {...props}
    />
  );
};

export default Image;