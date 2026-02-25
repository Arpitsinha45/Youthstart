
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-brand-border mt-auto py-12 px-6 md:px-8 lg:px-12 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-bold serif-title mb-6">YouthStartup.in</h2>
          <p className="text-xs text-gray-500 leading-loose uppercase tracking-widest">
            Daily startup, founder and<br />
            AI insights for builders.
          </p>
        </div>
        <div>
          <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Explore</h6>
          <ul className="text-xs space-y-4 text-gray-600 font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">Latest News</li>
            <li className="hover:text-white cursor-pointer transition-colors">Founder Stories</li>
            <li className="hover:text-white cursor-pointer transition-colors">AI & Tech</li>
            <li className="hover:text-white cursor-pointer transition-colors">Funding Rounds</li>
            <li className="hover:text-white cursor-pointer transition-colors">Startup Ideas</li>
          </ul>
        </div>
        <div>
          <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Company</h6>
          <ul className="text-xs space-y-4 text-gray-600 font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
            <li className="hover:text-white cursor-pointer transition-colors">Submit a Story</li>
          </ul>
        </div>
        <div>
          <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Legal & Policy</h6>
          <ul className="text-xs space-y-4 text-gray-600 font-medium">
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition-colors">Editorial Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Advertise</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} YouthStartup.in. All Rights Reserved.
        </p>
        <div className="flex items-center gap-6">
          <span className="text-[10px] text-gray-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Twitter</span>
          <span className="text-[10px] text-gray-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">LinkedIn</span>
          <span className="text-[10px] text-gray-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Instagram</span>
          <span className="text-[10px] text-gray-600 uppercase tracking-widest hover:text-white cursor-pointer transition-colors">Newsletter</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
