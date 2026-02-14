
import React from 'react';
import { Twitter, Linkedin, Facebook, Link2 } from 'lucide-react';

interface SocialShareProps {
  title: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, className = "" }) => {
  const handleShare = (platform: string) => {
    // Mock sharing functionality
    console.log(`Sharing "${title}" on ${platform}`);
    alert(`This would open a sharing dialog for ${platform}`);
  };

  const iconClasses = "w-4 h-4 text-gray-400 hover:text-brand-accent transition-colors cursor-pointer";

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">Share</span>
      <button onClick={() => handleShare('Twitter')} aria-label="Share on Twitter">
        <Twitter className={iconClasses} />
      </button>
      <button onClick={() => handleShare('LinkedIn')} aria-label="Share on LinkedIn">
        <Linkedin className={iconClasses} />
      </button>
      <button onClick={() => handleShare('Facebook')} aria-label="Share on Facebook">
        <Facebook className={iconClasses} />
      </button>
      <button onClick={() => handleShare('Link')} aria-label="Copy Link">
        <Link2 className={iconClasses} />
      </button>
    </div>
  );
};

export default SocialShare;
