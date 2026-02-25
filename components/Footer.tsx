
import React from 'react';
import { Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 mt-auto bg-black text-white pt-20 pb-10 px-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <h2 className="text-3xl font-bold serif-title mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">YouthStartup.in</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
              The premium editorial platform for the next generation of builders, founders, and innovators. We bring you the stories that matter in the startup ecosystem.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h6 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-6">Explore</h6>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Latest News</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Founder Stories</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> AI & Tech</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Funding Rounds</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Startup Ideas</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-6">Company</h6>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> About Us</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Careers</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Contact</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Submit a Story</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h6 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white mb-6">Legal & Policy</h6>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Terms of Service</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Editorial Policy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Advertise</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} YouthStartup.in. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Newsletter</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">RSS Feed</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
