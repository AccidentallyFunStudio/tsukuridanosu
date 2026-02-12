import React, { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { ASSETS_BASE } from '../constants';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    // Small delay to allow the menu to close visually before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-deep-black/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 md:gap-4 z-50 cursor-pointer group" 
            onClick={() => handleNavClick('latest')}
          >
            <img 
              src={`${ASSETS_BASE}/logo.jpg`} 
              alt="TSUKURIDANOSU Logo" 
              className="h-8 w-8 md:h-10 md:w-10 object-contain shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(230,0,0,0.8)] transition-all duration-300"
            />
            <div className="text-sm md:text-xl font-display font-bold tracking-[0.2em] text-white mix-blend-difference truncate max-w-[200px] md:max-w-none">
              TSUKURIDANOSU
            </div>
          </div>

          <div className="flex items-center gap-6 z-50">
            {/* Contact Button (Desktop) */}
            <button 
              onClick={() => handleNavClick('contact')}
              className="hidden md:flex items-center gap-2 px-6 py-2 border border-white/20 rounded-full hover:bg-intense-red hover:border-intense-red hover:text-white transition-all duration-300 group"
            >
              <Mail size={16} />
              <span className="font-display text-xs tracking-widest font-bold">CONTACT</span>
            </button>

            <button 
              onClick={toggleMenu}
              className="text-white hover:text-intense-red transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-deep-black z-40 flex items-center justify-center transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-12 text-center">
          {[
            { label: 'LATEST', id: 'latest' },
            { label: 'DISCOGRAPHY', id: 'discography' },
            { label: 'GALLERY', id: 'gallery' },
            { label: 'IMPRESSIONS', id: 'impressions' },
            { label: 'CONTACT', id: 'contact' }
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavClick(item.id)}
              className="font-display text-4xl md:text-6xl text-silver hover:text-intense-red transition-colors duration-300 glitch-hover tracking-widest bg-transparent border-none cursor-pointer"
              data-text={item.label}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Decorative Vertical Text */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block opacity-20 pointer-events-none">
          <p className="vertical-text text-8xl font-serif text-white font-bold">メニュー</p>
        </div>
      </div>
    </>
  );
};

export default Navigation;