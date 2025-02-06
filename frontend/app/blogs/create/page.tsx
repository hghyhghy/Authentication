'use client';
import { useState } from 'react';

export default function CreateBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please provide both title and content.');
      return;
    }

    const blogData = { title, content };

    try {
      const response = await fetch('http://localhost:3001/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        // Redirect to the blogs page after creating the blog
        window.location.href = '/blogs'; // Redirect back to blogs page
      } else {
        alert('Failed to create blog');
      }
    } catch (error) {
      alert('An error occurred while creating the blog');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create New Blog</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Blog Content
            </label>
            <textarea
              id="content"
              placeholder="Enter blog content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Save Blog
          </button>
        </form>
      </div>
    </div>
  );
}
