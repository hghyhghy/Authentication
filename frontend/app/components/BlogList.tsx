"use client";

import { useRouter } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
}

interface BlogListProps {
  blogs: Blog[];
  onDelete: (id: number) => void; // Callback function for deleting a blog
}

export default function BlogList({ blogs, onDelete }: BlogListProps) {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="border p-4 rounded-lg shadow-lg cursor-pointer bg-white hover:bg-gray-100 transition duration-300 relative"
        >
          <h2 className="text-xl font-bold text-black mb-2">{blog.title}</h2>
          <p className="text-gray-700">{blog.content.slice(0, 100)}...</p>
          
          <div className="flex justify-between mt-3">
            <button
              onClick={() => router.push(`/blogs/${blog.id}`)}
              className="text-blue-500"
            >
              View
            </button>
            <button
              onClick={() => onDelete(blog.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
