import React from 'react';

interface AIFeatureWrapperProps {
  hasAIKey: boolean;
  children: React.ReactNode;
  fallbackMessage?: string;
}

const AIFeatureWrapper: React.FC<AIFeatureWrapperProps> = ({ hasAIKey, children, fallbackMessage = "AI features unavailable" }) => {
  if (!hasAIKey) {
    return (
      <div className="text-xs text-gray-500 italic p-2 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
        {fallbackMessage}
      </div>
    );
  }
  return <>{children}</>;
};

export default AIFeatureWrapper;
