import React from 'react';
import { useAuth } from '../lib/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (fallback) return <>{fallback}</>;
    
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🔒</span>
        </div>
        <h1 className="text-2xl font-bold serif-title mb-4">Protected Area</h1>
        <p className="text-gray-400 mb-8 max-w-md">This section is reserved for our editorial team. Please sign in to continue.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => signIn()} 
            className="bg-white text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all"
          >
            Sign In with Google
          </button>
          <button 
            onClick={() => window.history.pushState({}, '', '/')} 
            className="border border-white/20 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
