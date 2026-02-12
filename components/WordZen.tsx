import React, { useRef, useEffect, useState } from 'react';
import { WordParticle } from '../types';
import { Send } from 'lucide-react';

const WordZen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputWord, setInputWord] = useState('');
  
  // Use useRef for particles to avoid React state batching conflicts during the animation loop
  const particlesRef = useRef<WordParticle[]>([]);
  const animationRef = useRef<number>(0);

  // Initial Seed Words
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const initialWords = ['Ethereal', 'Dark', 'Beautiful', 'Impulse', 'Shadow', 'Light', 'Silence', 'Void', 'Echo'];
    
    particlesRef.current = initialWords.map((text, i) => ({
      id: Date.now() + i,
      text,
      x: Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1,
      y: Math.random() * (400 * 0.8) + 50,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: isMobile ? Math.random() * 10 + 12 : Math.random() * 20 + 16,
      opacity: Math.random() * 0.5 + 0.3,
      life: 1000,
    }));
  }, []);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputWord.trim()) return;
    
    const isMobile = window.innerWidth < 768;

    const newWord: WordParticle = {
      id: Date.now(),
      text: inputWord,
      x: window.innerWidth / 2,
      y: 200, // Center vertically roughly
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: isMobile ? 24 : 48, // Larger for user input but responsive
      opacity: 1,
      life: 2000,
    };

    particlesRef.current.push(newWord);
    setInputWord('');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        const displayWidth = window.innerWidth;
        const displayHeight = 600;

        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        
        ctx.scale(dpr, dpr);
    };
    
    // Initial resize
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      // Clear canvas (using logic coordinates handled by scale, but safe to clear large area)
      const width = window.innerWidth;
      const height = 600;
      
      // We clear the whole raw canvas to be safe
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Update and draw words
      particlesRef.current.forEach(word => {
        // Movement
        word.x += word.vx;
        word.y += word.vy;
        
        // Boundaries bounce
        if (word.x < 0 || word.x > width) word.vx *= -1;
        if (word.y < 0 || word.y > height) word.vy *= -1;

        // Draw
        ctx.font = `${word.size}px 'Noto Serif JP'`;
        ctx.fillStyle = `rgba(245, 245, 245, ${word.opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Ink Bleed Effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(230, 0, 0, 0.5)'; // Red glow
        
        ctx.fillText(word.text, word.x, word.y);
        ctx.shadowBlur = 0; // Reset
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section id="impressions" className="relative min-h-[70vh] bg-deep-black border-t border-white/5 overflow-hidden flex flex-col items-center">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-charcoal/50 pointer-events-none"></div>

      <div className="container mx-auto px-6 pt-20 pb-8 text-center relative z-10">
        <h2 className="text-intense-red font-display text-sm tracking-[0.3em] mb-4">IMPRESSIONS</h2>
        <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">感情の共有</h3>
        <p className="text-gray-400 max-w-lg mx-auto mb-12 font-serif text-sm">
          Leave a single word that describes your experience. Let it drift into the void.
          <br/>
          <span className="text-xs opacity-50 mt-2 block">(一言で感想を残してください)</span>
        </p>

        <form onSubmit={handleAddWord} className="relative max-w-md w-full mx-auto z-20">
          <input
            type="text"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            maxLength={15}
            placeholder="Type your impression..."
            className="w-full bg-transparent border-b border-white/30 py-3 pl-4 pr-12 text-center text-xl text-white font-serif focus:outline-none focus:border-intense-red transition-colors placeholder:text-white/20"
          />
          <button 
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-intense-red transition-colors"
          >
            <Send size={20} />
          </button>
        </form>
      </div>

      {/* Canvas Layer */}
      <div className="absolute inset-0 top-32 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full opacity-80" />
      </div>
    </section>
  );
};

export default WordZen;
