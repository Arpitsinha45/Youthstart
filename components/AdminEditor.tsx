
import React, { useState } from 'react';
import { Save, Image as ImageIcon, X, Eye, FileText } from 'lucide-react';
import { Story } from '../types';

interface EditorProps {
  story?: Partial<Story>;
  onSave: (data: Partial<Story>) => void;
  onCancel: () => void;
}

const AdminEditor: React.FC<EditorProps> = ({ story, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: story?.title || '',
    slug: story?.slug || '',
    category: story?.category || 'Founder Stories',
    excerpt: story?.excerpt || '',
    content: story?.content || '',
    featuredImage: story?.featuredImage || '',
    published: story?.published ?? false,
    sponsored: story?.sponsored ?? false,
  });

  const [preview, setPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-accent" />
          {story?.id ? 'Edit Article' : 'New Article'}
        </h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreview(!preview)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {preview ? <FileText className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {preview ? 'Editor' : 'Preview'}
          </button>
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-dark"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-6 py-2 bg-brand-accent text-white text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {!preview ? (
            <>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Article Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange}
                  placeholder="Enter a compelling headline..."
                  className="w-full text-3xl serif-title font-bold border-b border-gray-200 focus:border-brand-accent outline-none py-2 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Short Excerpt</label>
                <textarea 
                  name="excerpt" value={formData.excerpt} onChange={handleChange}
                  rows={2}
                  className="w-full text-lg font-light italic border-b border-gray-200 focus:border-brand-accent outline-none py-2 resize-none transition-colors"
                  placeholder="Summarize the story in 2 sentences..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Content (Markdown Support)</label>
                <textarea 
                  name="content" value={formData.content} onChange={handleChange}
                  rows={20}
                  className="w-full font-mono text-sm border border-gray-200 p-4 focus:border-brand-accent outline-none transition-colors"
                  placeholder="Tell the story..."
                />
              </div>
            </>
          ) : (
            <div className="prose prose-lg max-w-none">
              <h1 className="serif-title text-4xl mb-4">{formData.title}</h1>
              <p className="text-xl italic text-gray-600 mb-8 border-l-4 border-brand-accent pl-6">{formData.excerpt}</p>
              <div className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                {formData.content || 'No content yet...'}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Featured Image URL</label>
            <div className="flex gap-2">
              <input 
                type="text" name="featuredImage" value={formData.featuredImage} onChange={handleChange}
                className="flex-grow bg-white border border-gray-200 p-2 text-xs outline-none focus:border-brand-accent"
                placeholder="https://..."
              />
              <button className="p-2 bg-gray-200 hover:bg-gray-300 transition-colors"><ImageIcon className="w-4 h-4" /></button>
            </div>
            {formData.featuredImage && (
              <img src={formData.featuredImage} className="mt-4 w-full aspect-video object-cover border border-gray-200" alt="Preview" />
            )}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Settings</label>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Category</span>
                <select name="category" value={formData.category} onChange={handleChange} className="text-xs bg-white border p-1 outline-none">
                  <option>Founder Stories</option>
                  <option>Funding News</option>
                  <option>Tech</option>
                  <option>Student Startups</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Slug</span>
                <input name="slug" value={formData.slug} onChange={handleChange} className="text-xs bg-white border p-1 outline-none w-32" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="accent-brand-accent" />
                <span className="text-xs font-semibold">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="sponsored" checked={formData.sponsored} onChange={handleChange} className="accent-brand-accent" />
                <span className="text-xs font-semibold text-brand-accent uppercase">Sponsored Content</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditor;
