'use client';
import { useState, FormEvent, useEffect } from 'react';

interface AuthFormData {
  username: string;
  email: string;
  password: string;
}

export default function AuthPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false); // State to track client-side rendering

  // Ensure that the component runs on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? '/users/login' : '/users/signup'; // Updated endpoint to match your backend routes

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      // Log response status and body
      console.log('Response Status:', response.status);
      const responseBody = await response.json();
      console.log('Response Body:', responseBody);

      // Handle response based on status code
      if (response.status === 200) {
        // Successful login/signup, redirect the user or handle success
        alert('Success! Redirecting...');
        window.location.href = '/'; // You can change this URL to redirect to the desired page
      } else {
        // Handle error
        alert(responseBody.message || 'Authentication failed, try again.');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('An error occurred, try again later.');
    }
  };

  // Only render the form if we're on the client-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
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
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 py-3 rounded-lg hover:bg-blue-600 transition duration-300 text-black"
          >
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-center text-blue-500 hover:underline"
        >
          {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
