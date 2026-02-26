import React from 'react';
import { TRENDING_AI_TOOLS } from '../constants';
import { Send, Facebook, Twitter, Instagram, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { Story } from '../types';
import { motion } from 'motion/react';
import { Skeleton } from './Skeleton';

interface ArticleGridProps {
  onStoryClick: (story: Story) => void;
  isLoading?: boolean;
  stories: Story[];
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ onStoryClick, isLoading, stories }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-white/10 border-y border-white/10">
        {/* Main Feature Skeleton */}
        <div className="md:col-span-2 lg:col-span-8 lg:row-span-2 bg-black p-6 md:p-12 flex flex-col justify-end min-h-[400px] lg:min-h-[600px] relative">
           <div className="w-full max-w-4xl">
             <div className="flex items-center gap-3 mb-6">
               <Skeleton className="w-8 h-px" />
               <Skeleton className="h-3 w-24" />
             </div>
             <Skeleton className="h-10 md:h-16 w-3/4 mb-4" />
             <Skeleton className="h-10 md:h-16 w-1/2 mb-6" />
             <Skeleton className="h-4 w-full max-w-2xl mb-2" />
             <Skeleton className="h-4 w-2/3 max-w-xl mb-6" />
             <div className="flex items-center gap-4">
               <Skeleton className="h-3 w-20" />
               <Skeleton className="h-3 w-24" />
             </div>
           </div>
        </div>

        {/* Top Right Skeleton */}
        <div className="md:col-span-1 lg:col-span-4 bg-black p-8 md:p-10 flex flex-col justify-center min-h-[250px]">
          <Skeleton className="h-3 w-20 mb-4" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-4/5 mb-6" />
          <Skeleton className="h-3 w-32" />
        </div>

        {/* Middle Right Skeleton */}
        <div className="md:col-span-1 lg:col-span-4 bg-black p-8 md:p-10 flex flex-col justify-center min-h-[250px]">
          <Skeleton className="h-3 w-20 mb-4" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-4/5 mb-6" />
          <Skeleton className="h-3 w-32" />
        </div>

        {/* Trending Skeleton */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-black p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
             <Skeleton className="w-8 h-8 rounded-full" />
             <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4 w-full">
                  <Skeleton className="w-4 h-4" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-5 w-12 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Middle Skeleton */}
        <div className="md:col-span-1 lg:col-span-4 bg-black flex flex-col">
          <Skeleton className="h-48 md:h-56 w-full rounded-none" />
          <div className="p-8 flex flex-col flex-grow justify-between">
            <div>
              <Skeleton className="h-3 w-20 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-4/5 mb-4" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        {/* Bottom Right Skeleton */}
        <div className="md:col-span-1 lg:col-span-4 bg-black flex flex-col">
          <Skeleton className="h-48 md:h-56 w-full rounded-none" />
          <div className="p-8 flex flex-col flex-grow justify-between">
            <div>
              <Skeleton className="h-3 w-20 mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-4/5 mb-4" />
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        {/* Row 4 Skeletons */}
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="md:col-span-1 lg:col-span-3 bg-black p-6 md:p-8 flex flex-col justify-between min-h-[250px]">
            <div>
              <Skeleton className="h-3 w-16 mb-4" />
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-4/5 mb-4" />
              <Skeleton className="h-3 w-full" />
            </div>
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const publishedStories = (stories || []).filter(s => s.published);
  
  // Ensure we have enough stories to display, fallback to the first one if not enough
  const getStory = (index: number) => publishedStories[index] || publishedStories[0];

  const story0 = getStory(0);
  const story1 = getStory(1);
  const story2 = getStory(2);
  const story3 = getStory(3);
  const story4 = getStory(4);

  if (!story0 && !isLoading) {
    return (
      <div className="py-20 text-center border-y border-white/10 bg-black">
        <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">No articles found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-white/10 border-y border-white/10">
      
      {/* Main Feature */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="md:col-span-2 lg:col-span-8 lg:row-span-2 bg-black relative group cursor-pointer overflow-hidden min-h-[400px] lg:min-h-[600px]"
        onClick={() => onStoryClick(story0)}
      >
        <img 
          src={story0?.featuredImage} 
          alt={story0?.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-emerald-400"></span>
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">{story0?.category}</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold serif-title text-white mb-6 leading-[1.1] group-hover:text-emerald-50 transition-colors">
            {story0?.title}
          </h2>
          <p className="text-gray-300 line-clamp-2 text-sm md:text-base mb-6 max-w-2xl">
            {story0?.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {story0?.readTime}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{story0?.author}</span>
          </div>
        </div>
      </motion.div>

      {/* Top Right */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="md:col-span-1 lg:col-span-4 bg-black p-8 md:p-10 flex flex-col justify-center group cursor-pointer hover:bg-white/5 transition-colors relative overflow-hidden min-h-[250px]"
        onClick={() => onStoryClick(story1)}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />
        <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-4 block relative z-10">{story1?.category}</span>
        <h3 className="text-2xl font-bold serif-title text-white mb-6 leading-snug group-hover:text-amber-50 transition-colors relative z-10">{story1?.title}</h3>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest relative z-10">
          <span>{story1?.readTime} Read</span>
          <span>•</span>
          <span>{story1?.publishedAt}</span>
        </div>
      </motion.div>

      {/* Middle Right */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="md:col-span-1 lg:col-span-4 bg-black p-8 md:p-10 flex flex-col justify-center group cursor-pointer hover:bg-white/5 transition-colors relative overflow-hidden min-h-[250px]"
        onClick={() => onStoryClick(story2)}
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
        <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4 block relative z-10">{story2?.category}</span>
        <h3 className="text-2xl font-bold serif-title text-white mb-6 leading-snug group-hover:text-blue-50 transition-colors relative z-10">{story2?.title}</h3>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono uppercase tracking-widest relative z-10">
          <span>{story2?.readTime} Read</span>
          <span>•</span>
          <span>{story2?.publishedAt}</span>
        </div>
      </motion.div>

      {/* Bottom Left - Trending */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="col-span-1 md:col-span-2 lg:col-span-4 bg-black p-8 md:p-10 flex flex-col"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Trending AI Tools</h4>
        </div>
        <div className="space-y-6 flex-grow">
          {TRENDING_AI_TOOLS.map((tool, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-mono text-xs">0{i + 1}</span>
                <div>
                  <div className="text-sm font-bold group-hover:text-emerald-400 transition-colors text-white">{tool.name}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{tool.category}</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">{tool.growth}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Middle */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="md:col-span-1 lg:col-span-4 bg-black group cursor-pointer hover:bg-white/5 transition-colors flex flex-col"
        onClick={() => onStoryClick(story3)}
      >
        <div className="h-48 md:h-56 w-full overflow-hidden relative">
          <img 
            src={story3?.featuredImage} 
            alt={story3?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-8 flex flex-col flex-grow justify-between">
          <div>
            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-4 block">{story3?.category}</span>
            <h3 className="text-xl font-bold serif-title text-white mb-4 leading-snug group-hover:text-purple-50 transition-colors">{story3?.title}</h3>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{story3?.excerpt}</p>
        </div>
      </motion.div>

      {/* Bottom Right */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="md:col-span-1 lg:col-span-4 bg-black group cursor-pointer hover:bg-white/5 transition-colors flex flex-col"
        onClick={() => onStoryClick(story4)}
      >
        <div className="h-48 md:h-56 w-full overflow-hidden relative">
          <img 
            src={story4?.featuredImage} 
            alt={story4?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-8 flex flex-col flex-grow justify-between">
          <div>
            <span className="text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-4 block">{story4?.category}</span>
            <h3 className="text-xl font-bold serif-title text-white mb-4 leading-snug group-hover:text-rose-50 transition-colors">{story4?.title}</h3>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{story4?.excerpt}</p>
        </div>
      </motion.div>

      {/* Row 4: 4 columns of smaller stories */}
      {publishedStories.slice(5, 9).map((story, i) => (
        <motion.div 
          key={story.id} 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="md:col-span-1 lg:col-span-3 bg-black p-6 md:p-8 group cursor-pointer hover:bg-white/5 transition-colors flex flex-col justify-between min-h-[250px]"
          onClick={() => onStoryClick(story)}
        >
          <div>
            <span className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mb-4 block group-hover:text-gray-300 transition-colors">{story.category}</span>
            <h4 className="text-lg font-bold serif-title text-white mb-4 leading-snug">{story.title}</h4>
            <p className="text-xs text-gray-400 line-clamp-2">{story.excerpt}</p>
          </div>
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
            <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">{story.readTime} Read</span>
            <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ArticleGrid;
