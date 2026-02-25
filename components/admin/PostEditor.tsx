import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Sparkles, Star } from 'lucide-react';
import { Story } from '../../types';

interface PostEditorProps {
  stories: Story[];
  setStories: React.Dispatch<React.SetStateAction<Story[]>>;
}

export const PostEditor: React.FC<PostEditorProps> = ({ stories, setStories }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleFeatured = (id: string) => {
    setStories(stories.map(story => 
      story.id === id ? { ...story, featured: !story.featured } : story
    ));
  };

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold serif-title">Create New Post</h2>
          <div className="flex gap-3">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm">Cancel</button>
            <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-sm font-bold">Publish Post</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <input 
              type="text" 
              placeholder="Post Title..." 
              className="w-full bg-transparent text-4xl font-bold serif-title border-none focus:outline-none focus:ring-0 placeholder:text-gray-700"
            />
            
            <div className="w-full h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer">
              <ImageIcon className="w-8 h-8 mb-2" />
              <p className="text-sm">Click to upload cover image</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">AI Summary Generator</span>
              </div>
              <textarea 
                placeholder="Let AI generate a summary or write your own..." 
                className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-300 resize-none h-20"
              ></textarea>
            </div>

            <textarea 
              placeholder="Write your story here..." 
              className="w-full bg-transparent border-none focus:outline-none text-lg text-gray-300 min-h-[400px] resize-none"
            ></textarea>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Settings</h3>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <select className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30">
                  <option>Founder Stories</option>
                  <option>AI Tools</option>
                  <option>Funding</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Tags (comma separated)</label>
                <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30" placeholder="startup, tech, ai" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-300">Featured Post</span>
                <input type="checkbox" className="w-4 h-4 accent-emerald-500" />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">SEO Meta</h3>
              <div>
                <label className="block text-xs text-gray-500 mb-1">SEO Title</label>
                <input type="text" className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Meta Description</label>
                <textarea className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30 h-24 resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold serif-title mb-2">Posts & Articles</h1>
          <p className="text-gray-400">Manage your blog content, categories, and tags.</p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-x-auto">
        <table className="w-full text-left text-sm min-w-[600px]">
          <thead className="bg-white/5 border-b border-white/10 text-gray-400">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Author</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {stories.map((story) => (
              <tr key={story.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white max-w-[200px] truncate" title={story.title}>{story.title}</td>
                <td className="p-4 text-gray-400">{story.author}</td>
                <td className="p-4"><span className="px-2 py-1 bg-white/10 rounded text-xs">{story.category}</span></td>
                <td className="p-4 text-gray-400">{story.publishedAt}</td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleFeatured(story.id)}
                    className={`p-1.5 rounded-full transition-colors ${story.featured ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                    title={story.featured ? "Remove from featured" : "Set as featured"}
                  >
                    <Star className={`w-4 h-4 ${story.featured ? 'fill-current' : ''}`} />
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
