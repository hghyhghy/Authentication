interface Blog {
  id: number;
  title: string;
  content: string;
}

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
        >
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{blog.title}</h3>
            <p className="text-gray-600 text-base">{blog.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
