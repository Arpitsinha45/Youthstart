
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, User, Calendar, Twitter, Linkedin, Globe as WebsiteIcon } from 'lucide-react';
import { Story } from '../types';
import SocialShare from './SocialShare';
import { motion, useScroll, useSpring } from 'motion/react';
import { AUTHORS, LATEST_STORIES } from '../constants';

interface ArticlePageProps {
  story: Story;
  onBack: () => void;
  onStoryClick: (story: Story) => void;
  onAuthorClick: (authorId: string) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ story, onBack, onStoryClick, onAuthorClick }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const author = AUTHORS.find(a => a.id === story.authorId);
  const otherArticles = LATEST_STORIES.filter(s => s.authorId === story.authorId && s.id !== story.id).slice(0, 3);
  
  const relatedArticles = LATEST_STORIES.filter(s => s.id !== story.id && s.category === story.category).slice(0, 3);
  if (relatedArticles.length < 3) {
    const additionalArticles = LATEST_STORIES.filter(s => s.id !== story.id && s.category !== story.category).slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...additionalArticles);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <article className="relative min-h-screen bg-black text-white">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-16 left-0 right-0 h-1 bg-white origin-left z-50" 
        style={{ scaleX }} 
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-20">
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>

        <header className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6"
          >
            {story.category}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold serif-title leading-[1.1] mb-10 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
          >
            {story.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 border-y border-white/10 py-6 bg-white/[0.02] rounded-2xl mb-8"
          >
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white">
              <User className="w-3 h-3 text-gray-500" />
              {story.authorId ? (
                <button onClick={() => onAuthorClick(story.authorId!)} className="hover:text-gray-300 transition-colors">
                  <span>{story.author}</span>
                </button>
              ) : (
                <span>{story.author}</span>
              )}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{story.publishedAt}</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{story.readTime} Read</span>
            </div>
            <div className="hidden md:block h-4 w-px bg-brand-border"></div>
            <SocialShare title={story.title} />
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[16/9] w-full overflow-hidden mb-16 md:mb-24 border border-white/10 rounded-2xl shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          <img 
            src={story.featuredImage} 
            alt={story.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-3xl font-light italic leading-relaxed text-gray-200 mb-16 serif-title border-l-4 border-emerald-500/50 pl-8 py-2"
          >
            {story.excerpt}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none prose-p:text-lg md:prose-p:text-[22px] prose-p:leading-[1.9] prose-p:text-gray-300 prose-p:mb-10 font-sans"
          >
            <p>
              In the fast-paced world of modern entrepreneurship, stories like this serve as a beacon for the next generation. 
              Building a business is never just about the product; it's about the resilience of the founder and the 
              strength of the community they build around their vision.
            </p>
            <p>
              Across the ecosystem, we see a shift towards sustainable models and purpose-driven innovation. 
              The journey described here highlights the critical moments of doubt and the eventual breakthroughs 
              that define the startup experience. From initial ideation to the first major funding round, 
              every step is a lesson in adaptability.
            </p>
            <blockquote className="border-l-4 border-emerald-500 bg-white/5 p-8 rounded-r-2xl my-16 shadow-lg">
              <p className="text-2xl md:text-3xl font-bold text-white serif-title leading-snug italic mb-0">
                "The greatest risk is not taking any risk in a world that's changing really quickly."
              </p>
              <footer className="text-xs text-gray-400 mt-6 uppercase tracking-[0.2em] font-bold">— Mark Zuckerberg</footer>
            </blockquote>
            <p>
              As we continue to track the progress of {story.author}'s highlighted ventures, 
              one thing remains clear: the barrier to entry has never been lower, yet the competition 
              for meaningful impact has never been higher.
            </p>
          </motion.div>

          {/* Author Section */}
          {author && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mt-32 p-10 border border-white/10 rounded-3xl bg-gradient-to-b from-white/5 to-transparent shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <img 
                  src={author.avatar} 
                  alt={author.name} 
                  className="w-24 h-24 rounded-full object-cover border-2 border-brand-border"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold serif-title">{author.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{author.role}</p>
                    </div>
                    <div className="flex items-center justify-center md:justify-end gap-4">
                      {author.social?.twitter && (
                        <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {author.social?.linkedin && (
                        <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {author.social?.website && (
                        <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <WebsiteIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {author.bio}
                  </p>
                  
                  {otherArticles.length > 0 && (
                    <div className="pt-6 border-t border-brand-border">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">More by {author.name}</h4>
                      <ul className="space-y-3">
                        {otherArticles.map(article => (
                          <li key={article.id}>
                            <button 
                              onClick={() => onStoryClick(article)}
                              className="text-sm text-white hover:text-gray-300 transition-colors text-left line-clamp-1"
                            >
                              {article.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 pt-12 border-t border-brand-border flex flex-col items-center"
          >
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-8 text-gray-600">Share this insight</h4>
            <SocialShare title={story.title} className="mb-16" />
            
            <div className="bg-white/5 border border-brand-border w-full p-10 text-center rounded-2xl backdrop-blur-sm">
              <h5 className="text-2xl font-bold serif-title mb-4">Support Independent Startup Journalism</h5>
              <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">Get the best of YouthStartup.in delivered straight to your inbox every morning.</p>
              <button className="bg-white text-black px-10 py-4 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-full shadow-lg">
                Subscribe to Newsletter
              </button>
            </div>
          </motion.div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 pt-12 border-t border-brand-border"
            >
              <h4 className="text-2xl font-bold serif-title mb-8">Related Articles</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="group cursor-pointer border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all bg-white/5 flex flex-col"
                    onClick={() => onStoryClick(article)}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.featuredImage} 
                        alt={article.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                      <h5 className="text-lg font-bold serif-title leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2">
                        {article.title}
                      </h5>
                      <div className="mt-auto flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        Read Story <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;