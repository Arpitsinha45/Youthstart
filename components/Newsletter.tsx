
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <div className="bg-brand-dark text-white p-8 mt-12">
      <h4 className="text-xl font-bold serif-title mb-2">The Founder's Brief</h4>
      <p className="text-sm font-light text-gray-400 mb-6 leading-relaxed">
        Join 10,000+ aspiring founders. Weekly insights on building and scaling your next venture.
      </p>
      <div className="space-y-4">
        <input 
          type="email" 
          placeholder="Email address" 
          className="w-full bg-transparent border-b border-gray-600 py-2 text-sm focus:outline-none focus:border-brand-accent transition-colors"
        />
        <button className="w-full bg-brand-accent hover:bg-red-800 text-white py-3 text-[11px] font-bold uppercase tracking-widest transition-colors">
          Subscribe Now
        </button>
      </div>
    </div>
  );
};

export default Newsletter;
