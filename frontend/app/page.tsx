'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

// Blog type definition
type Blog = {
  id: number;
  title: string;
  content: string;
};

export default function AuthPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>(''); // State for error message
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear error message before making request

    const endpoint = isLogin ? '/users/login' : '/users/signup';

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const responseBody = await response.json();

      if (response.status === 200) {
        // Redirect to blogs page on successful login
        router.push('/blogs'); // Using Next.js router for navigation
      } else {
        setError(responseBody.message || 'Invalid credentials, please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          {isLogin ? 'Login' : 'Signup'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
          )}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          {/* Display error message if there is one */}
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 "
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError(''); // Clear error message when switching forms
          }}
          className="w-full mt-4 text-center text-blue-500 hover:underline"
        >
          {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
        </button>
      </div>
      {/* Blog List */}
      <div className="mt-10 w-full max-w-3xl">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-4 mb-4 cursor-pointer"
            onClick={() => router.push(`/blog/${blog.id}`)}
          >
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
