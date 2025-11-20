import { Link } from "react-router";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-gray-200 border-b border-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide text-white hover:text-gray-300 transition">
          PeisJournal
        </Link>

        <nav className="flex items-center space-x-6 text-sm">
          <Link to="/feed" className="hover:text-white transition">Blogs</Link>
          <Link to="/add-blog" className="hover:text-white transition">Add Blog</Link>
          <Link to="/profile" className="hover:text-white transition">Profile</Link>
          <Link to="/login" className="hover:text-white transition">Login</Link>
          <Link to="/register" className="hover:text-white transition">Register</Link>
          <button className="hover:text-white transition">Logout</button>
        </nav>
      </div>
    </header>
  );
}
