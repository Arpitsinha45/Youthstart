
import React from 'react';
import { Story } from '../types';

interface CardProps {
  story: Story;
  onClick?: (story: Story) => void;
}

export const LatestStoryCard: React.FC<CardProps> = ({ story, onClick }) => (
  <div 
    onClick={() => onClick?.(story)}
    className="group border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 cursor-pointer"
  >
    <div className="text-[10px] font-bold text-brand-accent uppercase tracking-wider mb-2">{story.category}</div>
    <h3 className="text-lg font-bold serif-title leading-tight mb-2 group-hover:underline decoration-1 underline-offset-4 decoration-brand-accent">
      {story.title}
    </h3>
    {/* Fixed: Use story.excerpt instead of story.summary */}
    <p className="text-sm text-gray-600 line-clamp-2 font-light leading-relaxed mb-3">
      {story.excerpt}
    </p>
    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-brand-accent">
      <span>{story.author}</span>
      <span className="text-gray-300">•</span>
      <span>{story.publishedAt}</span>
    </div>
  </div>
);

export const FeaturedStoryCard: React.FC<CardProps> = ({ story, onClick }) => (
  <div 
    onClick={() => onClick?.(story)}
    className="group cursor-pointer"
  >
    <div className="relative overflow-hidden aspect-[16/10] mb-6">
      {/* Fixed: Use story.featuredImage instead of story.imageUrl */}
      <img 
        src={story.featuredImage} 
        alt={story.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4 bg-brand-accent text-white px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase">
        {story.category}
      </div>
    </div>
    <h2 className="text-3xl md:text-5xl font-bold serif-title leading-[1.1] mb-4 group-hover:underline decoration-1 underline-offset-8 decoration-brand-accent">
      {story.title}
    </h2>
    {/* Fixed: Use story.excerpt instead of story.summary */}
    <p className="text-lg text-gray-700 font-light leading-relaxed mb-6">
      {story.excerpt}
    </p>
    <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-brand-accent">
      <span>{story.author}</span>
      <span className="text-gray-300">|</span>
      <span className="text-gray-500">{story.readTime} read</span>
    </div>
  </div>
);

export const SecondaryStoryCard: React.FC<CardProps> = ({ story, onClick }) => (
  <div 
    onClick={() => onClick?.(story)}
    className="group flex gap-5 py-8 border-t border-gray-200 cursor-pointer"
  >
    <div className="w-1/3 overflow-hidden aspect-[4/3] flex-shrink-0">
      {/* Fixed: Use story.featuredImage instead of story.imageUrl */}
      <img 
        src={story.featuredImage} 
        alt={story.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
    <div className="w-2/3">
      <div className="text-[9px] font-bold text-brand-accent uppercase tracking-wider mb-2">{story.category}</div>
      <h4 className="text-lg font-bold serif-title leading-tight mb-2 group-hover:underline decoration-1 underline-offset-4 decoration-brand-accent">
        {story.title}
      </h4>
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
        <span>{story.author}</span>
        <span>•</span>
        <span>{story.readTime}</span>
      </div>
    </div>
  </div>
);

export const MoreStoryCard: React.FC<CardProps> = ({ story, onClick }) => (
  <div 
    onClick={() => onClick?.(story)}
    className="group cursor-pointer"
  >
    <div className="relative overflow-hidden aspect-[3/2] mb-4">
      {/* Fixed: Use story.featuredImage instead of story.imageUrl */}
      <img 
        src={story.featuredImage} 
        alt={story.title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
    <div className="text-[10px] font-bold text-brand-accent uppercase tracking-wider mb-2">{story.category}</div>
    <h3 className="text-xl font-bold serif-title leading-tight mb-3 group-hover:underline decoration-1 underline-offset-4 decoration-brand-accent">
      {story.title}
    </h3>
    {/* Fixed: Use story.excerpt instead of story.summary */}
    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
      {story.excerpt}
    </p>
  </div>
);