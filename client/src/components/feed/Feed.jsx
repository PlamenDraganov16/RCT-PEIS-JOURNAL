import BlogCard from "../blog-card/BlogCard.jsx";
import useRequest from "../../hooks/useRequest.js";
import { useNavigate } from "react-router";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useEffect } from "react";

export default function Feed() {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserContext();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/welcome', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const { data: blogs } = useRequest('/data/blogs', []);

    return (
        <section className="w-full bg-gray-900 text-white py-10 min-h-[80vh]">
            <div className="w-full lg:w-[95%] mx-auto">

                <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-500 pl-3">
                    All Blogs
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogCard key={blog._id} {...blog} />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-full">
                            No blogs available.
                        </p>
                    )}
                </div>

            </div>
        </section>
    )
}