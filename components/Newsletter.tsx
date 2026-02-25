import React from 'react';
import { motion } from 'motion/react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-8 lg:px-12 border-t border-brand-border relative overflow-hidden bg-black">
      {/* Subtle animated background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-6 block">
            The Weekly Brief
          </span>
          <h2 className="text-4xl md:text-6xl font-bold serif-title mb-8 leading-tight">
            Daily <span className="italic font-normal">startup, founder</span> and <br className="hidden md:block" />
            <span className="text-white">AI insights</span> for builders.
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ entrepreneurs receiving our curated deep-dives into the future of business and technology.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow bg-white/5 border border-brand-border rounded-full px-8 py-4 text-sm focus:outline-none focus:border-white transition-colors backdrop-blur-sm"
            />
            <button className="px-10 py-4 bg-white text-black rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all shadow-lg shadow-white/5">
              Subscribe
            </button>
          </form>
          
          <p className="mt-6 text-[10px] text-gray-600 uppercase tracking-widest">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
