
import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

interface ConfigErrorProps {
  missingKeys: string[];
}

const ConfigError: React.FC<ConfigErrorProps> = ({ missingKeys }) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-zinc-900 border border-red-900/30 rounded-2xl p-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4 serif-title">Configuration Required</h1>
        
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          The application is missing some required environment variables. Please set the following keys in your environment to enable all features:
        </p>
        
        <div className="bg-black/40 rounded-xl p-4 mb-8 text-left border border-white/5">
          <ul className="space-y-2">
            {missingKeys.map((key) => (
              <li key={key} className="flex items-center gap-2 text-xs font-mono text-red-400">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {key}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <a 
            href="https://supabase.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
          >
            Get Supabase Keys <ExternalLink className="w-3 h-3" />
          </a>
          
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            Check .env.example for more details
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfigError;
