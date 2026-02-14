
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-300 mt-20 pt-16 pb-12 px-4 md:px-8 bg-brand-bg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-xl font-bold serif-title mb-6">YOUTHSTARTUPS.IN</h2>
          <p className="text-xs text-gray-500 leading-loose uppercase tracking-widest">
            Inspiring the Next Generation<br />
            of Global Entrepreneurs.
          </p>
        </div>
        <div>
          <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Explore</h6>
          <ul className="text-xs space-y-4 text-gray-600 font-medium">
            <li className="hover:text-brand-accent cursor-pointer">Founder Stories</li>
            <li className="hover:text-brand-accent cursor-pointer">Funding News</li>
            <li className="hover:text-brand-accent cursor-pointer">Student Hub</li>
            <li className="hover:text-brand-accent cursor-pointer">Side Hustles</li>
          </ul>
        </div>
        <div>
          <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Company</h6>
          <ul className="text-xs space-y-4 text-gray-600 font-medium">
            <li className="hover:text-brand-accent cursor-pointer">About Us</li>
            <li className="hover:text-brand-accent cursor-pointer">Contact</li>
            <li className="hover:text-brand-accent cursor-pointer">Careers</li>
            <li className="hover:text-brand-accent cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h6 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Connect</h6>
          <ul className="text-xs space-y-4 text-gray-600 font-medium">
            <li className="hover:text-brand-accent cursor-pointer">Twitter</li>
            <li className="hover:text-brand-accent cursor-pointer">LinkedIn</li>
            <li className="hover:text-brand-accent cursor-pointer">Instagram</li>
            <li className="hover:text-brand-accent cursor-pointer">Newsletter</li>
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-gray-200 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} YouthStartups.in. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
