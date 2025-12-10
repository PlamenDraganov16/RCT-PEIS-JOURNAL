import BlogCard from "../blog-card/BlogCard.jsx";
import { Link, useNavigate } from "react-router";
import useRequest from "../../hooks/useRequest.js";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useUserContext();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/welcome', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const { data: lastBlogs = [] } = useRequest(
        `/data/blogs?sortBy=_createdOn%20desc&pageSize=4`,
        []
    );

    if (!lastBlogs.length) return (
        <div className="text-gray-300 text-center mt-6">
            No blogs available.
        </div>
    );

    const [featuredBlog, ...sideBlogs] = lastBlogs;

    return (
        <section className="w-full bg-gray-900 text-white py-6 min-h-[80.8vh]">
            <div className="w-full lg:w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <img
                        src={featuredBlog?.imageUrl}
                        alt={featuredBlog?.title}
                        className="w-full h-56 lg:h-64 object-cover"
                    />

                    <div className="p-4 flex flex-col flex-grow">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">{featuredBlog.title}</h1>
                        <p className="text-gray-400 text-xs lg:text-sm mb-2">
                            {featuredBlog?.author} • {featuredBlog?.date}
                        </p>

                        <p className="text-gray-300 flex-grow text-sm lg:text-base leading-snug">
                            {featuredBlog?.content.substring(0, 150)}...
                        </p>

                        <Link
                            to={`/feed/${featuredBlog?._id}/details`}
                            className="mt-3 w-fit px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition text-sm"
                        >
                            Read More
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col space-y-3">
                    {sideBlogs.map((blog) => (<BlogCard key={blog._id} {...blog} />))}
                </div>

            </div>
        </section>
    );
}


