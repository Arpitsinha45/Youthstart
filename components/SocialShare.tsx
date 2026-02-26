
import React, { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check, Mail, MessageCircle, Instagram } from 'lucide-react';

interface SocialShareProps {
  title: string;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, className = "" }) => {
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedBody = encodeURIComponent(`Check out this article: ${title} - ${url}`);

    switch (platform) {
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank', 'width=600,height=400');
        break;
      case 'LinkedIn':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank', 'width=600,height=400');
        break;
      case 'Facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank', 'width=600,height=400');
        break;
      case 'WhatsApp':
        window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, '_blank');
        break;
      case 'Instagram':
        navigator.clipboard.writeText(url).then(() => {
          setCopiedPlatform('Instagram');
          setTimeout(() => setCopiedPlatform(null), 2000);
        });
        break;
      case 'Email':
        window.open(`mailto:?subject=${encodedTitle}&body=${encodedBody}`, '_blank');
        break;
      case 'Link':
        navigator.clipboard.writeText(url).then(() => {
          setCopiedPlatform('Link');
          setTimeout(() => setCopiedPlatform(null), 2000);
        });
        break;
      default:
        break;
    }
  };

  const iconClasses = "w-4 h-4 text-gray-400 hover:text-white transition-colors cursor-pointer";

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mr-2">Share</span>
      <button onClick={() => handleShare('Twitter')} aria-label="Share on Twitter">
        <Twitter className={iconClasses} />
      </button>
      <button onClick={() => handleShare('LinkedIn')} aria-label="Share on LinkedIn">
        <Linkedin className={iconClasses} />
      </button>
      <button onClick={() => handleShare('Instagram')} aria-label="Share on Instagram" className="relative">
        {copiedPlatform === 'Instagram' ? <Check className="w-4 h-4 text-emerald-500" /> : <Instagram className={iconClasses} />}
      </button>
      <button onClick={() => handleShare('WhatsApp')} aria-label="Share on WhatsApp">
        <MessageCircle className={iconClasses} />
      </button>
      <button onClick={() => handleShare('Facebook')} aria-label="Share on Facebook">
        <Facebook className={iconClasses} />
      </button>
      <button onClick={() => handleShare('Email')} aria-label="Share via Email">
        <Mail className={iconClasses} />
      </button>
      <button onClick={() => handleShare('Link')} aria-label="Copy Link" className="relative">
        {copiedPlatform === 'Link' ? <Check className="w-4 h-4 text-emerald-500" /> : <Link2 className={iconClasses} />}
      </button>
    </div>
  );
};

export default SocialShare;
