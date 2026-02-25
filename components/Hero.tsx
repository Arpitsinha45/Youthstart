import React, { useState, useEffect } from 'react';
import { ArrowRight, User, Bookmark, Share2, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { Story } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onStoryClick: (story: Story) => void;
  stories: Story[];
}

const Hero: React.FC<HeroProps> = ({ onStoryClick, stories }) => {
  const featuredStories = stories.filter(s => s.featured);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredStories.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredStories.length);
    }, 10000); // 10 seconds
    
    return () => clearInterval(interval);
  }, [featuredStories.length]);

  if (featuredStories.length === 0) return null;
  
  const currentStory = featuredStories[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredStories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);
  };

  return (
    <section className="relative h-[80vh] min-h-[500px] max-h-[800px] w-full overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStory.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img 
            src={currentStory.featuredImage} 
            alt={currentStory.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-105 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
          
          {/* Content */}
          <div className="relative h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-5xl">
            <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="w-8 h-px bg-white/40"></span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold text-white/60">
                Featured Story
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold serif-title leading-[0.95] mb-8 md:mb-12 tracking-tight animate-in fade-in slide-in-from-left-6 duration-1000 delay-100">
              {currentStory.title}
            </h2>
            
            <div className="flex flex-wrap items-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <button 
                onClick={() => onStoryClick(currentStory)}
                className="flex items-center gap-3 md:gap-4 bg-white text-black hover:bg-gray-200 px-6 py-3 md:px-8 md:py-4 rounded-full transition-all group/btn"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black flex items-center justify-center text-white group-hover/btn:scale-110 transition-transform">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em]">Read Story</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      {featuredStories.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 md:right-24 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-20 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {featuredStories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Floating Social Icons */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-10">
        {[User, Bookmark, Share2, MessageSquare].map((Icon, i) => (
          <button key={i} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all bg-black/20 backdrop-blur-sm">
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
