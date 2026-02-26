import React, { useEffect } from 'react';
import { Author, Story } from '../types';
import { AUTHORS } from '../constants';
import { ArrowLeft, Twitter, Linkedin, Globe as WebsiteIcon, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';

interface AuthorPageProps {
  authorId: string;
  onBack: () => void;
  onStoryClick: (story: Story) => void;
  stories: Story[];
}

const AuthorPage: React.FC<AuthorPageProps> = ({ authorId, onBack, onStoryClick, stories }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [authorId]);

  const author = AUTHORS.find(a => a.id === authorId);
  const authorStories = (stories || []).filter(story => story?.authorId === authorId);

  if (!author) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Author Not Found</h2>
        <p className="text-gray-400 mb-8">The author you are looking for does not exist.</p>
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-20 relative z-10">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>

        {/* Author Profile Header - Bento Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start backdrop-blur-sm"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full blur-xl opacity-20" />
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/20 relative z-10"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-gray-300 font-bold mb-4">
                {author.role}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold serif-title mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">{author.name}</h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                {author.bio}
              </p>
              
              <div className="flex items-center justify-center md:justify-start gap-4">
                {author.social?.twitter && (
                  <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {author.social?.linkedin && (
                  <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {author.social?.website && (
                  <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <WebsiteIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 bg-gradient-to-br from-emerald-900/20 to-black border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col justify-center items-center text-center"
          >
            <div className="text-5xl md:text-7xl font-bold serif-title text-emerald-400 mb-2">{authorStories.length}</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-8">Published Articles</div>
            <button className="w-full py-4 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors">
              Follow Author
            </button>
          </motion.div>
        </div>

        {/* Author's Articles - Complex Grid */}
        <div>
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold serif-title">Latest from {author.name}</h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          {authorStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {authorStories.map((story, index) => {
                // First item is large, others are smaller
                const isFeatured = index === 0;
                const colSpan = isFeatured ? 'col-span-1 md:col-span-12' : 'col-span-1 md:col-span-6 lg:col-span-4';
                
                return (
                  <motion.div 
                    key={story.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`group cursor-pointer bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all flex ${isFeatured ? 'flex-col md:flex-row' : 'flex-col'} ${colSpan}`}
                    onClick={() => onStoryClick(story)}
                  >
                    <div className={`${isFeatured ? 'md:w-1/2 lg:w-3/5 aspect-video md:aspect-auto' : 'aspect-[16/9]'} w-full overflow-hidden relative`}>
                      <img 
                        src={story.featuredImage} 
                        alt={story.title} 
                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {isFeatured && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />}
                    </div>
                    <div className={`p-6 md:p-8 flex flex-col justify-center ${isFeatured ? 'md:w-1/2 lg:w-2/5' : 'flex-grow'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                          {story.category}
                        </span>
                        <span className="flex items-center gap-1 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                          <Clock className="w-3 h-3" /> {story.readTime}
                        </span>
                      </div>
                      <h3 className={`${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold serif-title leading-snug text-white group-hover:text-gray-200 transition-colors mb-4`}>
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-3 mb-6">
                        {story.excerpt}
                      </p>
                      <div className={`mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity ${isFeatured ? 'transform translate-x-[-10px] group-hover:translate-x-0 duration-300' : ''}`}>
                        Read Article <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
              <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">No articles published yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorPage;
