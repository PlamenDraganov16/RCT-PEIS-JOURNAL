import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";
import useForm from "../../../hooks/useForm";
import { v4 as uuid } from 'uuid';
import { useState } from "react";

export default function CreateComment({
    user,
    onCreateEnd,
    onCreateStart,
}) {
    const { blogId } = useParams();
    const { request } = useRequest();
    const [error, setError] = useState(null);

    const submitHandler = async ({ comment }) => {
        if (!comment || !comment.trim()) {
            setError("Comment cannot be empty");
            return;
        }

        setError(null);

        const data = {
            _id: uuid(),
            message: comment,
            blogId,
        };

        onCreateStart(data);

        try {
            const createdComment = await request('/data/comments', 'POST', data);

            onCreateEnd(createdComment);
            setValues({ comment: '' });

        } catch (err) {
            setError(err.message || "Failed to create comment");
        }
    }

    const {
        register,
        formAction,
    } = useForm(submitHandler, {
        comment: '',
    })

    return (
        <article className="w-full bg-gray-900 text-white p-4 rounded-xl shadow-lg">
            <label className="block text-lg font-semibold mb-2">
                Add new comment:
            </label>

            <form className="flex flex-col space-y-3" action={formAction}>
                <textarea
                    {...register('comment')}
                    placeholder="Comment..."
                    className="w-full h-32 p-3 bg-gray-800 text-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-green-500 shadow"
                ></textarea>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    className="btn submit px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold cursor-pointer transition text-sm w-fit"
                    type="submit"
                    value="Add Comment"
                    disabled={!user}
                />
            </form>
        </article>
    );
}