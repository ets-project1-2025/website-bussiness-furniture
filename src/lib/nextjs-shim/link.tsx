// src/lib/nextjs-shim/link.tsx
// Adapter untuk komponen Link dari Next.js agar kompatibel dengan Astro
import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: any;
}

const Link: React.FC<LinkProps> = ({ href, children, className, onClick, ...props }) => {
  return (
    <a 
      href={href} 
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;