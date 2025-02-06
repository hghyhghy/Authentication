"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/blogs/${id}`) // Fetch the selected blog from the backend
        .then((res) => res.json())
        .then((data) => setBlog(data));
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-700">{blog.content}</p>
    </div>
  );
}
