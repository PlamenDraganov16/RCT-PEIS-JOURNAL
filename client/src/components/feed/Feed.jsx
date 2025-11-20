import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import BlogCard from "../blog-card/BlogCard.jsx";

export default function Feed() {
    const [blogs, setAllBlogs] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = 6;

    // Get page from URL query, default to 1
    const pageFromUrl = parseInt(searchParams.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromUrl);

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
                }

            });

        return () => controller.abort();
    }, [])

    // Sync page state with URL
    useEffect(() => {
        setSearchParams({ page: currentPage });
    }, [currentPage]);

    useEffect(() => {
        const page = parseInt(searchParams.get("page")) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    const totalPages = Math.ceil(blogs.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentBlogs = blogs.slice(startIndex, startIndex + pageSize);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <section className="w-full bg-gray-900 text-white py-10 min-h-[80vh]">
            <div className="w-full lg:w-[95%] mx-auto">

                <h2 className="text-3xl font-bold mb-6 border-l-4 border-green-500 pl-3">
                    All Blogs
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentBlogs.length > 0 ? (
                        currentBlogs.map((blog) => (
                            <BlogCard key={blog._id} {...blog} />
                        ))
                    ) : (
                        <p className="text-gray-400 text-center col-span-full">
                            No blogs available.
                        </p>
                    )}

                    {blogs.length > pageSize && (
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="flex items-center text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-semibold transition disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </section>
    )
}