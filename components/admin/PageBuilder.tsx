import React from 'react';
import { GripVertical, Plus, Settings, Eye, Copy, Trash2 } from 'lucide-react';

export const PageBuilder = () => {
  const sections = [
    { id: 1, name: 'Hero Section', type: 'hero' },
    { id: 2, name: 'Startup Showcase Grid', type: 'grid' },
    { id: 3, name: 'Newsletter Opt-in', type: 'form' },
    { id: 4, name: 'Latest Articles', type: 'blog' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold serif-title mb-2">Page Builder</h1>
          <p className="text-gray-400">Drag and drop sections to build your homepage.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm flex items-center gap-2">
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-sm font-bold">
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {sections.map((section) => (
            <div key={section.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="cursor-grab text-gray-500 hover:text-white">
                  <GripVertical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white">{section.name}</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">{section.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"><Settings className="w-4 h-4" /></button>
                <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"><Copy className="w-4 h-4" /></button>
                <button className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
          
          <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:border-white/30 hover:text-white transition-all flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Section
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Available Blocks</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Hero', 'Text Block', 'Image Gallery', 'Blog Grid', 'Pricing', 'Testimonials', 'Newsletter', 'Custom HTML'].map(block => (
                <div key={block} className="bg-black border border-white/10 rounded-lg p-3 text-center text-xs text-gray-300 cursor-pointer hover:border-white/30 transition-colors">
                  {block}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
