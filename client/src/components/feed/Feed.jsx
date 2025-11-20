import { useEffect, useState } from "react";
import BlogCard from "../blog-card/BlogCard.jsx";

export default function Feed() {
    
    const [blogs, setAllBlogs] = useState([]);
    useEffect(() => {
        const controller = new AbortController();

        fetch('http://localhost:3030/jsonstore/blogs', {
            signal: controller.signal
        })
            .then(response => response.json())
            .then(result => {
                const resultBlogs = Object.values(result);

                resultBlogs.sort((a, b) => (b._createdOn || 0) - (a._createdOn || 0));

                setAllBlogs(resultBlogs);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(err.message);
                    setLoading(false);
                }

            });

        return () => controller.abort();
    }, [])

    return (
        <section className="w-full bg-gray-900 text-white py-10 min-h-[80vh]">
            <div className="w-full lg:w-[95%] mx-auto">

                <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-500 pl-3">
                    All Blogs
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs && blogs.length > 0 ? (
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