import React from 'react';
import { Globe, Key, Search, Database } from 'lucide-react';

export const SettingsPanel = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold serif-title mb-2">System Settings</h1>
        <p className="text-gray-400">Configure SEO, domains, API keys, and integrations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SEO Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Search className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Global SEO</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Site Title Format</label>
              <input type="text" defaultValue="%s | YouthStartup.in" className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Default Meta Description</label>
              <textarea className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30 h-24 resize-none"></textarea>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
              Generate Sitemap.xml
            </button>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Key className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">API Integrations</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">OpenAI API Key (For AI Summaries)</label>
              <input type="password" defaultValue="sk-..." className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Stripe Secret Key (Monetization)</label>
              <input type="password" defaultValue="sk_test_..." className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Google Analytics ID</label>
              <input type="text" defaultValue="G-XXXXXXXXXX" className="w-full bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30" />
            </div>
          </div>
        </div>

        {/* Domain Settings */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Domain & Hosting</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Custom Domain</label>
              <div className="flex gap-2">
                <input type="text" defaultValue="youthstartup.in" className="flex-1 bg-black border border-white/10 rounded-lg p-2.5 text-sm focus:outline-none focus:border-white/30" />
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">Verify</button>
              </div>
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <div className="text-sm text-emerald-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                Domain is connected and SSL is active.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
