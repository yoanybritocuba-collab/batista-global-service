import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children, showFooter = true, showMobileBar = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header /> {/* Siemvisible en todas las áreas */}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && <Footer />}
      {showMobileBar && <MobileBottomBar />}
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default MainLayout;