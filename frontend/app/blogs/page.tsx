'use client';
import { useEffect, useState } from 'react';
import BlogList from '../components/BlogList';

interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('http://localhost:3001/blogs');
      const data = await response.json();
      setBlogs(data);
    };
    
    fetchBlogs();
  }, []);

  const handleCreateBlog = () => {
    window.location.href = '/blogs/create';  // Redirect to the create blog page
  };

  return (
    <>
     <div>

      <BlogList blogs={blogs} />
     </div>
    

      <div className=' flex items-center justify-center mt-5'>

      <button onClick={handleCreateBlog}  className=' bg-blue-700 rounded p-3 text-white'>Create Blog</button>
      </div>
    </>
  );
}
