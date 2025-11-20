import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import DetailsCard from "../details-card/DetailsCard.jsx";

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
            await fetch(`http://localhost:3030/jsonstore/blogs/${blogId}`, {
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

                <DetailsCard {...blog} />

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