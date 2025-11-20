import { Link } from "react-router";

export default function BlogCard({
    _id,
    title,
    author,
    date,
    imageUrl,
    content
}) {
    return (
        <div
            className="bg-gray-800 rounded-xl shadow-md flex overflow-hidden"
        >
            <img
                src={imageUrl}
                alt={title}
                className="w-32 lg:w-36 object-cover aspect-[4/3]"
            />

            <div className="p-3 flex flex-col flex-grow">
                <h2 className="text-lg lg:text-xl font-semibold leading-tight">
                    {title}
                </h2>

                <p className="text-gray-400 text-xs mt-0.5">
                    {author} • {date}
                </p>

                <p className="text-gray-300 text-sm mt-1 flex-grow">
                    {content.substring(0, 80)}...
                </p>

                <Link
                    to={`/feed/${_id}/details`}
                    className="mt-3 w-fit px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition text-sm"
                >
                    Read More
                </Link>
            </div>
        </div>
    )
}