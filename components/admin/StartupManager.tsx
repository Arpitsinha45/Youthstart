import React from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Star } from 'lucide-react';

export const StartupManager = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold serif-title mb-2">Startup Hall of Fame</h1>
          <p className="text-gray-400">Manage featured startups, rankings, and directories.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
          <Plus className="w-4 h-4" />
          Add Startup
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 bg-black/50 rounded hover:bg-white/20"><Edit2 className="w-4 h-4" /></button>
              <button className="p-1.5 bg-black/50 rounded hover:bg-red-500/50 text-red-400"><Trash2 className="w-4 h-4" /></button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">TechNova {i}</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest">AI & Data</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-6 line-clamp-2">
              Revolutionizing data analytics with generative AI models for enterprise customers.
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700"></div>
                <span className="text-xs text-gray-300">Jane Doe</span>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Trending</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
