import React from 'react';
import Starfield from './Starfield';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Starfield />
      {/* Global gradient overlay for better text contrast/atmosphere */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/80 -z-0" />
      <div className="relative z-0">
        {children}
      </div>
    </>
  );
};

export default Layout;