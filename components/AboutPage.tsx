import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Rocket, Globe } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-12 pb-24 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight serif-title">
            Empowering the Next Generation of <span className="text-emerald-400">Founders</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            YouthStartup.in is the premier digital destination for young entrepreneurs, innovators, and change-makers building the future.
          </p>
        </motion.div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To democratize access to startup knowledge, resources, and networks for young founders globally. We believe age is no barrier to innovation.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold">Global Impact</h3>
            <p className="text-gray-400 leading-relaxed">
              Connecting a diverse community of builders from over 50 countries. We bridge the gap between local ecosystems and global opportunities.
            </p>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center serif-title">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Alex Rivera', role: 'Editor-in-Chief', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
              { name: 'Sarah Chen', role: 'Head of Growth', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400' },
              { name: 'Marcus Johnson', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl aspect-[3/4]"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 border-y border-white/10">
          {[
            { label: 'Monthly Readers', value: '500K+' },
            { label: 'Countries', value: '50+' },
            { label: 'Startup Stories', value: '1000+' },
            { label: 'Community Members', value: '25K+' }
          ].map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center space-y-6 py-12">
          <h2 className="text-3xl font-bold serif-title">Join the Movement</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Whether you're a founder, investor, or enthusiast, there's a place for you in our community.
          </p>
          <button className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
            Get Involved
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
