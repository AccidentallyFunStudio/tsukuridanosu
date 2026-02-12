import React, { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Discography from './components/Discography';
import StageGallery from './components/StageGallery';
import WordZen from './components/WordZen';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading for a more "app-like" feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-deep-black flex items-center justify-center z-[100]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border border-white/20 border-t-intense-red rounded-full animate-spin mb-8"></div>
          <h1 className="text-white font-display tracking-[0.5em] text-sm animate-pulse">LOADING</h1>
          <p className="text-intense-red font-serif text-xs mt-2">読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-deep-black min-h-screen text-silver selection:bg-intense-red selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <Discography />
        <StageGallery />
        <WordZen />
      </main>
      <Footer />
    </div>
  );
};

export default App;
