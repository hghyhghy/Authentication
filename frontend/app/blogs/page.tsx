'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogList from '../components/BlogList';

interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [availableBlogs, setAvailableBlogs] = useState<number>(0);
  const limit = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blogs?page=${currentPage}&limit=${limit}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (data && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
          setTotalPages(data.totalPages || 1);
        } else {
          console.error("Unexpected API response:", data);
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      }
    };

    const fetchAvailableBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:3001/blogs/count`);
        const data = await response.json();
        setAvailableBlogs(data.availableBlogs || 0);
      } catch (error) {
        console.error("Error fetching available blog count:", error);
      }
    };

    fetchBlogs();
    fetchAvailableBlogs();
  }, [currentPage]);

  // Open confirmation modal
  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Function to delete a blog
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`http://localhost:3001/blogs/${deleteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs((prevBlogs) => prevBlogs?.filter((blog) => blog.id !== deleteId) || []);
      setAvailableBlogs((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  const handleCreateBlog = () => {
    window.location.href = '/blogs/create';
  };

  return (
    <>
      <div className="text-center text-xl font-semibold mt-4">
        Available Blogs: <span className="text-blue-600">{availableBlogs}</span>
      </div>

      <div>
        {blogs === null ? (
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : (
          <BlogList blogs={blogs} onDelete={confirmDelete} />
        )}
      </div>

      <div className='flex justify-center mt-5'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-2 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg text-center h-44">
            <p className="mb-4 text-black mt-5">Are you sure you want to delete this blog?</p>
            <div className="flex justify-center items-center">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">OK</button>
              <button onClick={() => setShowConfirm(false)} className="bg-blue-700 px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className='flex items-center justify-center mt-5 mb-4'>
        <button onClick={handleCreateBlog} className='bg-blue-700 rounded p-3 text-white'>Create Blog</button>
      </div>
    </>
  );
}
