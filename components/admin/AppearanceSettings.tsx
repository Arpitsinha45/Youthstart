import React from 'react';
import { Upload, Layout, Type, Palette } from 'lucide-react';

export const AppearanceSettings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold serif-title mb-2">Appearance & Branding</h1>
        <p className="text-gray-400">Customize the look and feel of your publication.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Logo & Branding */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Layout className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold">Logo & Identity</h2>
            </div>
            
            <div className="flex items-start gap-8">
              <div className="w-32 h-32 bg-black border border-white/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold serif-title">YS</span>
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Site Name</label>
                  <input type="text" defaultValue="YouthStartup.in" className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30" />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                  <Upload className="w-4 h-4" /> Upload New Logo
                </button>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Type className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold">Typography</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Heading Font</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30">
                  <option>Playfair Display</option>
                  <option>Inter</option>
                  <option>Space Grotesk</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Body Font</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30">
                  <option>Inter</option>
                  <option>Roboto</option>
                  <option>System UI</option>
                </select>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Palette className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold">Theme Colors</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Primary Accent</label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 border border-white/20"></div>
                  <span className="text-sm font-mono">#10B981</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Background</label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-black border border-white/20"></div>
                  <span className="text-sm font-mono">#000000</span>
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Surface</label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0a0a0a] border border-white/20"></div>
                  <span className="text-sm font-mono">#0A0A0A</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Global Layout</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Dark Mode Default</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Enable Animations</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Container Width</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30">
                  <option>Max-w-7xl (1280px)</option>
                  <option>Max-w-5xl (1024px)</option>
                  <option>Full Width</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Border Radius</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30">
                  <option>Rounded (8px)</option>
                  <option>Sharp (0px)</option>
                  <option>Pill (9999px)</option>
                </select>
              </div>
            </div>
          </div>
          
          <button className="w-full py-3 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors">
            Save Appearance
          </button>
        </div>
      </div>
    </div>
  );
};
