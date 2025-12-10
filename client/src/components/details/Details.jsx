import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import DetailsCard from "../details-card/DetailsCard.jsx";
import useRequest from "../../hooks/useRequest";
import { useUserContext } from "../../contexts/UserContext";
import { useOptimistic } from "react";
import DetailsComments from "./details-comment/DetailsComment.jsx";
import CreateComment from "./create-comment/CreateComment.jsx";

export default function Details() {
    const { blogId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useUserContext();
    const { data: blog, request } = useRequest(`/data/blogs/${blogId}`, {})

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/welcome', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const urlParams = new URLSearchParams({
        where: `blogId=${JSON.stringify(blogId)}`,
        load: 'author=_ownerId:users'
    });

    const isOwner = user?._id === blog?._ownerId;

    const { data: comments, setData: setComments } = useRequest(`/data/comments?${urlParams.toString()}`, []);

    const [optimisticComments, dispatchOptimisticComments] = useOptimistic(comments, (state, action) => {
        switch (action.type) {
            case 'ADD_COMMENT':
                return [...state, action.payload];
            default:
                return state;
        }
    });

    const deleteGameHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete game: ${blog.title}`);

        if (!isConfirmed) {
            return;
        }

        try {
            await request(`/data/blogs/${blogId}`, 'DELETE');

            navigate('/feed');
        } catch (err) {
            alert('Unable to delete blog: ', err.message);
        }
    };

    const createEndCommentHandler = (createdComment) => {
        setComments(prevComments => [...prevComments, { ...createdComment, author: user }]);
    };

    const createStartCommentHandler = (newComment) => {
        dispatchOptimisticComments({ type: 'ADD_COMMENT', payload: { ...newComment, author: user, pending: true } });
    };

    return (
        <section className="w-full bg-gray-900 text-white py-10 min-h-[80vh]">
            <div className="w-full lg:w-[80%] mx-auto flex flex-col gap-8">

                {/* Game Details Card */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col gap-8">

                    <DetailsCard {...blog} />

                    {/* Summary Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Summary</h2>
                        <p className="text-gray-300 leading-relaxed">{blog.summary}</p>
                    </div>

                    {/* Edit/Delete Buttons */}
                    {/* <div className="flex gap-3">
                        <Link
                            to={`/feed/${blogId}/edit`}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-sm transition"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={deleteGameHandler}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition text-sm shadow-md"
                        >
                            Delete
                        </button>
                    </div> */}
                    {isOwner && (
                        <div className="flex gap-3">
                            <Link
                                to={`/feed/${blogId}/edit`}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-sm transition"
                            >
                                Edit
                            </Link>

                            <button
                                onClick={deleteGameHandler}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition text-sm shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    {/* Comments Section */}
                    <DetailsComments comments={optimisticComments} />

                </div>

                {/* Create Comment (If Authenticated) */}
                {isAuthenticated && (
                    <CreateComment
                        user={user}
                        onCreateStart={createStartCommentHandler}
                        onCreateEnd={createEndCommentHandler}
                    />
                )}

            </div>
        </section>
    );
}