import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Sparkles, Star, Loader2, Save, X } from 'lucide-react';
import { Post, Author, Category } from '../../src/types/admin';
import { generateArticleImage } from '../../lib/geminiService';
import AIFeatureWrapper from '../AIFeatureWrapper';
import { createPost, updatePost, deletePost, uploadImage, getPosts } from '../../lib/adminApi';

interface PostEditorProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>; 
  hasAIKey: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({ posts: initialPosts, setPosts, hasAIKey }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [posts, setLocalPosts] = useState<Post[]>(initialPosts);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published' | 'scheduled'>('draft');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [ogImage, setOgImage] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoadingPosts(true);
    try {
      const fetchedPosts = await getPosts();
      setLocalPosts(fetchedPosts);
      setPosts(fetchedPosts); // Update parent state
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setContent('');
    setExcerpt('');
    setFeaturedImage(null);
    setCategoryId(null);
    setAuthorId(null);
    setIsFeatured(false);
    setStatus('draft');
    setSeoTitle('');
    setSeoDescription('');
    setOgImage(null);
    setTags([]);
    setEditingId(null);
    setIsEditing(false);
  };

  const handleEditClick = (post: Post) => {
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
    setExcerpt(post.excerpt || '');
    setFeaturedImage(post.featured_image || null);
    setCategoryId(post.category_id || null);
    setAuthorId(post.author_id || null);
    setIsFeatured(post.is_featured);
    setStatus(post.status);
    setSeoTitle(post.seo_title || '');
    setSeoDescription(post.seo_description || '');
    setOgImage(post.og_image || null);
    setTags(post.tags || []);
    setEditingId(post.id);
    setIsEditing(true);
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!editingId) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      setFeaturedImage(url);
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!title) return;
    
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateArticleImage(title);
      
      // Convert base64 to File and upload
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const file = new File([blob], `generated-${Date.now()}.png`, { type: 'image/png' });
      
      const uploadedUrl = await uploadImage(file);
      setFeaturedImage(uploadedUrl);
    } catch (error) {
      console.error("Failed to generate image", error);
      alert("Failed to generate image");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSave = async () => {
    if (!title || !content || !authorId || !categoryId) {
      alert("Title, content, author, and category are required");
      return;
    }

    setIsSaving(true);
    try {
      const postData: Partial<Post> = {
        title,
        slug: slug || generateSlug(title),
        content,
        excerpt,
        featured_image: featuredImage,
        category_id: categoryId,
        author_id: authorId,
        is_featured: isFeatured,
        status,
        seo_title: seoTitle,
        seo_description: seoDescription,
        og_image: ogImage,
        tags,
      };

      if (editingId) {
        await updatePost(editingId, postData);
        fetchPosts(); // Refetch to get updated data
      } else {
        await createPost(postData);
        fetchPosts(); // Refetch to get new post
      }
      resetForm();
    } catch (error) {
      console.error("Failed to save post", error);
      alert("Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      fetchPosts(); // Refetch to update list
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Failed to delete post");
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await updatePost(id, { is_featured: !currentFeatured });
      fetchPosts(); // Refetch to update list
    } catch (error) {
      console.error("Failed to toggle featured", error);
    }
  };

  if (loadingPosts) {
    return <div className="text-white">Loading posts...</div>;
  }

  if (isEditing) {
    return (
      <div className="space-y-6 max-w-5xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold serif-title">{editingId ? 'Edit Post' : 'Create New Post'}</h2>
          <div className="flex gap-3">
            <button onClick={resetForm} className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm">Cancel</button>
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-sm font-bold flex items-center gap-2"
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />} 
              {editingId ? 'Update Post' : 'Publish Post'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <input 
              type="text" 
              placeholder="Post Title..." 
              value={title}
              onChange={handleTitleChange}
              className="w-full bg-transparent text-4xl font-bold serif-title border-none focus:outline-none focus:ring-0 placeholder:text-gray-700"
            />
            
            <div className="relative group">
              {featuredImage ? (
                <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                  <img src={featuredImage} alt="Cover" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setFeaturedImage(null)}
                    className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white hover:bg-red-500/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="w-full h-64 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer">
                  {isUploading ? (
                    <Loader2 className="w-8 h-8 mb-2 animate-spin" />
                  ) : (
                    <ImageIcon className="w-8 h-8 mb-2" />
                  )}
                  <p className="text-sm">{isUploading ? 'Uploading...' : 'Click to upload cover image'}</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
              
              {!featuredImage && (
                <AIFeatureWrapper hasAIKey={hasAIKey} fallbackMessage="AI image generation unavailable">
                  <button 
                    onClick={handleGenerateImage}
                    disabled={!title || isGeneratingImage}
                    className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isGeneratingImage ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    {isGeneratingImage ? 'Generating...' : 'Generate with AI'}
                  </button>
                </AIFeatureWrapper>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2 text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Excerpt</span>
              </div>
              <textarea 
                placeholder="Short summary for cards..." 
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-sm text-gray-300 resize-none h-20"
              ></textarea>
            </div>

            <textarea 
              placeholder="Write your story here..." 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-lg text-gray-300 min-h-[400px] resize-none"
            ></textarea>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Settings</h3>
              
              <div>
                <label className="block text-xs text-gray-500 mb-1">Slug</label>
                <input 
                  type="text" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30" 
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30"
                >
                  <option>Founder Stories</option>
                  <option>AI Tools</option>
                  <option>Funding</option>
                  <option>News</option>
                  <option>Trending</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1">Author</label>
                <input 
                  type="text" 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm focus:outline-none focus:border-white/30" 
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-300">Featured Post</span>
                <input 
                  type="checkbox" 
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-emerald-500" 
                />
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
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Featured</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {(stories || []).map((story) => (
              <tr key={story?.id} className="hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium text-white max-w-[200px] truncate" title={post.title}>{post.title}</td>
                <td className="p-4 text-gray-400">{post.author_id}</td> {/* TODO: Resolve author name */}
                <td className="p-4"><span className="px-2 py-1 bg-white/10 rounded text-xs">{post.category_id}</span></td> {/* TODO: Resolve category name */}
                <td className="p-4 text-gray-400"><span className={`px-2 py-1 rounded text-xs ${
                  post.status === 'published' ? 'bg-emerald-500/20 text-emerald-400' :
                  post.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>{post.status}</span></td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleFeatured(post.id, post.is_featured)}
                    className={`p-1.5 rounded-full transition-colors ${post.is_featured ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-gray-500 hover:text-white'}`}
                    title={post.is_featured ? "Remove from featured" : "Set as featured"}
                  >
                    <Star className={`w-4 h-4 ${post.is_featured ? 'fill-current' : ''}`} />
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEditClick(post)} className="p-1 text-gray-400 hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(post.id)} className="p-1 text-gray-400 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
