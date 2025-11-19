import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner.jsx";
import BlogCard from "../blog-card/BlogCard.jsx";

export default function Home() {
    const [featuredBlog, setFeaturedBlog] = useState(null);
    const [sideBlogs, setSideBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        fetch('http://localhost:3030/jsonstore/blogs', {
            signal: controller.signal
        })
            .then(response => response.json())
            .then(result => {
                const resultBlogs = Object.values(result);

                resultBlogs.sort((a, b) => (b._createdOn || 0) - (a._createdOn || 0));

                setFeaturedBlog(resultBlogs[0]);

                const randomBlogs = resultBlogs
                    .filter(blog => blog._id !== resultBlogs[0]._id)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 3);

                setSideBlogs(randomBlogs);
                setLoading(false);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(err.message);
                    setLoading(false);
                }

            });

        return () => controller.abort();
    }, [])

    if (loading) return <Spinner size={48} color="#22c55e" />

    return (
        <section className="w-full bg-gray-900 text-white py-6 min-h-[80.8vh]">
            <div className="w-full lg:w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
                    <img
                        src={featuredBlog.imageUrl}
                        alt={featuredBlog.title}
                        className="w-full h-56 lg:h-64 object-cover"
                    />

                    <div className="p-4 flex flex-col flex-grow">
                        <h1 className="text-2xl lg:text-3xl font-bold mb-1">{featuredBlog.title}</h1>
                        <p className="text-gray-400 text-xs lg:text-sm mb-2">
                            {featuredBlog.author} • {featuredBlog.date}
                        </p>

                        <p className="text-gray-300 flex-grow text-sm lg:text-base leading-snug">
                            {featuredBlog.content.substring(0, 150)}...
                        </p>

                        <button className="mt-3 w-fit px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition text-sm">
                            Read More
                        </button>
                    </div>
                </div>

                <div className="flex flex-col space-y-3">
                    {sideBlogs.map((blog) => (<BlogCard key={blog._id} {...blog} />))}
                </div>

            </div>
        </section>
    );
}


