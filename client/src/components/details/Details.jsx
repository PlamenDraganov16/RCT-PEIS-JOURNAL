import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"

export default function Details() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        fetch(`http://localhost:3030/jsonstore/blogs/${blogId}`, {
            signal: controller.signal
        })
            .then(response => response.json())
            .then(result => setBlog(result))
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(err.message);
                }
            });

        return () => controller.abort();
    }, [blogId])

    const deleteBlogHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete blog: ${blog.title}`)

        if (!isConfirmed) return;

        try {
            await fetch(`http://localhost:3030/jsonstore/games/${gameId}`, {
                method: 'DELETE',
            });

            navigate('/');
        } catch (err) {
            alert(err.message);
        }


    }

    return (
        <section className="w-full bg-gray-900 text-white py-10 min-h-[80vh]">
            <div className="w-full lg:w-[80%] mx-auto flex flex-col gap-6">

                {/* Blog Image */}
                <div className="w-full rounded-xl overflow-hidden shadow-xl">
                    <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-64 lg:h-96 object-cover"
                    />
                </div>

                <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col gap-4">
                    <h1 className="text-3xl lg:text-4xl font-bold">{blog.title}</h1>

                    <p className="text-gray-400 text-sm">
                        {blog.author} • {blog.date}
                    </p>

                    <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                        {blog.content}
                    </p>

                    {blog.tags && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {blog.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    <Link
                        to="/feed"
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold text-sm transition"
                    >
                        Back to Blogs
                    </Link>

                    <button
                        onClick={deleteBlogHandler}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition text-sm shadow-md"
                    >
                        Delete
                    </button>
                </div>

            </div>
        </section>

    )
}