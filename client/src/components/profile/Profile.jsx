import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useRequest from "../../hooks/useRequest";
import { useUserContext } from "../../contexts/UserContext";
import BlogCard from "../blog-card/BlogCard";

export default function Profile() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useUserContext();
    const { request } = useRequest();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/welcome");
            return;
        }

        const fetchUserBlogs = async () => {
            try {
                const userBlogs = await request(`/data/blogs?where=_ownerId%3D%22${user._id}%22`);
                setBlogs(userBlogs);
            } catch (err) {
                setError(err.message || "Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, [user, isAuthenticated, navigate, request]);

    if (loading) return <p className="text-center text-white mt-6">Loading profile...</p>;
    if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;

    const profileImage = user.profilePicture || '/images/default-avatar.png';

    return (
        <section className="bg-gray-900 text-white py-16 px-4 min-h-[80vh]">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">

                {/* User Info */}
                <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
                        <p className="text-gray-300 mt-2"><span className="font-semibold">Total Blogs:</span> {blogs.length}</p>
                    </div>
                    <div>
                        <img
                            src="/images/profile.png"
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                        />
                    </div>
                </div>

                {/* User Blogs */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold mb-4">My Blogs</h2>

                    {blogs.length === 0 ? (
                        <p className="text-gray-400">You haven't created any blogs yet.</p>
                    ) : (
                        blogs.map(blog => (
                            <BlogCard key={blog._id} {...blog} />
                        ))
                    )}
                </div>

            </div>
        </section>
    );
}
