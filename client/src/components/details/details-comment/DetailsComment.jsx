export default function DetailsComments({ comments }) {
    return (
        <div className="w-full bg-gray-900 text-white p-6 rounded-xl shadow-lg mt-6">
            <h2 className="text-xl font-semibold mb-4">Comments:</h2>

            <ul className="space-y-3">
                {comments.map(comment => (
                    <li
                        key={comment._id}
                        className={`p-3 rounded-lg bg-gray-800 shadow 
                            ${comment.pending ? "opacity-50" : ""}`}
                    >
                        <p className="text-sm text-gray-300">
                            <span className="font-semibold">{comment.author?.email}:</span>{" "}
                            {comment.message}
                        </p>
                    </li>
                ))}
            </ul>

            {comments.length === 0 && (
                <p className="text-gray-400 italic mt-3">No comments.</p>
            )}
        </div>
    );
}