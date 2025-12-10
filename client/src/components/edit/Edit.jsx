// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router";
// import useForm from "../../hooks/useForm";
// import useRequest from "../../hooks/useRequest";
// import { useUserContext } from "../../contexts/UserContext.jsx";

// export default function Edit() {
//     const navigate = useNavigate();
//     const { blogId } = useParams();
//     const { request } = useRequest();

//     const { isAuthenticated } = useUserContext();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate('/welcome', { replace: true });
//         }
//     }, [isAuthenticated, navigate]);

//     const editBlogHandler = async (values) => {
//         try {
//             await request(`/data/blogs/${blogId}`, 'PUT', values);
//             navigate(`/feed/${blogId}/details`);
//         } catch (err) {
//             alert(err.message)
//         }
//     }

//     const { register, formAction, setValues } = useForm(editBlogHandler, {
//         title: '',
//         tags: [],
//         author: '',
//         date: '',
//         imageUrl: '',
//         content: '',
//     });

//     useEffect(() => {
//         request(`/data/blogs/${blogId}`)
//             .then(result => setValues(result))
//             .catch(err => alert(err.message));
//     }, [blogId, setValues]);

//     return (
//         <section className="bg-gray-900 text-white py-16 px-4">
//             <div className="max-w-4xl mx-auto">
//                 <h1 className="text-4xl font-bold text-center mb-8">Edit Blog</h1>
//                 <form
//                     className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-6"
//                     action={formAction}
//                 >
//                     {/* Blog Title */}
//                     <div className="flex flex-col">
//                         <label htmlFor="blogTitle" className="text-lg font-semibold mb-2">
//                             Blog Title
//                         </label>
//                         <input
//                             type="text"
//                             id="blogTitle"
//                             {...register("title")}
//                             placeholder="Enter blog title..."
//                             className="p-3 rounded-lg bg-gray-700 text-white outline-none"
//                         />
//                     </div>

//                     {/* Author */}
//                     <div className="flex flex-col">
//                         <label htmlFor="author" className="text-lg font-semibold mb-2">
//                             Author
//                         </label>
//                         <input
//                             type="text"
//                             id="author"
//                             {...register("author")}
//                             placeholder="Enter author name..."
//                             className="p-3 rounded-lg bg-gray-700 text-white outline-none"
//                         />
//                     </div>

//                     {/* Publish Date */}
//                     <div className="flex flex-col">
//                         <label htmlFor="date" className="text-lg font-semibold mb-2">
//                             Publish Date
//                         </label>
//                         <input
//                             type="date"
//                             id="date"
//                             {...register("date")}
//                             className="p-3 rounded-lg bg-gray-700 text-white outline-none"
//                         />
//                     </div>

//                     {/* Tags */}
//                     <div className="flex flex-col">
//                         <label htmlFor="tags" className="text-lg font-semibold mb-2">
//                             Tags (comma separated)
//                         </label>
//                         <input
//                             type="text"
//                             id="tags"
//                             {...register("tags")}
//                             placeholder="health, nutrition, wellness"
//                             className="p-3 rounded-lg bg-gray-700 text-white outline-none"
//                         />
//                     </div>

//                     {/* Image URL */}
//                     <div className="flex flex-col">
//                         <label htmlFor="imageUrl" className="text-lg font-semibold mb-2">
//                             Image URL
//                         </label>
//                         <input
//                             type="text"
//                             id="imageUrl"
//                             {...register("imageUrl")}
//                             placeholder="Enter image URL..."
//                             className="p-3 rounded-lg bg-gray-700 text-white outline-none"
//                         />
//                     </div>

//                     {/* Content */}
//                     <div className="flex flex-col">
//                         <label htmlFor="content" className="text-lg font-semibold mb-2">
//                             Content
//                         </label>
//                         <textarea
//                             id="content"
//                             {...register("content")}
//                             rows="6"
//                             placeholder="Write the blog content here..."
//                             className="p-3 rounded-lg bg-gray-700 text-white outline-none resize-none"
//                         ></textarea>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold shadow-md"
//                     >
//                         Update Blog
//                     </button>
//                 </form>
//             </div>
//         </section>
//     );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { useUserContext } from "../../contexts/UserContext.jsx";

export default function Edit() {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { blogId } = useParams();
    const { request } = useRequest();
    const { isAuthenticated } = useUserContext();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/welcome', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const editBlogHandler = async (values) => {
        const { title, author, date, tags, imageUrl, content } = values;
        let newErrors = {};

        if (!title.trim()) newErrors.title = 'Title is required';
        if (!author.trim()) newErrors.author = 'Author is required';
        if (!date) newErrors.date = 'Publish date is required';
        if (!tags.trim()) newErrors.tags = 'At least one tag is required';
        if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
        if (!content.trim()) newErrors.content = 'Content is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const formattedValues = {
                ...values,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag) // remove empty strings
            };
            await request(`/data/blogs/${blogId}`, 'PUT', formattedValues);
            navigate(`/feed/${blogId}/details`);
        } catch (err) {
            setErrors({ submit: err.message || 'Something went wrong while updating the blog.' });
        }
    };

    const { register, formAction, setValues } = useForm(editBlogHandler, {
        title: '',
        tags: '',
        author: '',
        date: '',
        imageUrl: '',
        content: '',
    });

    useEffect(() => {
        request(`/data/blogs/${blogId}`)
            .then(result => {
                // Convert tags array to comma-separated string for input
                if (Array.isArray(result.tags)) {
                    result.tags = result.tags.join(', ');
                }
                setValues(result);
            })
            .catch(err => setErrors({ submit: err.message }));
    }, [blogId, setValues]);

    return (
        <section className="bg-gray-900 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Edit Blog</h1>
                <form
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-6"
                    action={formAction}
                >
                    {/* Blog Title */}
                    <div className="flex flex-col">
                        <label htmlFor="blogTitle" className="text-lg font-semibold mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            id="blogTitle"
                            {...register("title")}
                            placeholder="Enter blog title..."
                            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    {/* Author */}
                    <div className="flex flex-col">
                        <label htmlFor="author" className="text-lg font-semibold mb-2">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            {...register("author")}
                            placeholder="Enter author name..."
                            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
                    </div>

                    {/* Publish Date */}
                    <div className="flex flex-col">
                        <label htmlFor="date" className="text-lg font-semibold mb-2">
                            Publish Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            {...register("date")}
                            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col">
                        <label htmlFor="tags" className="text-lg font-semibold mb-2">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            id="tags"
                            {...register("tags")}
                            placeholder="health, nutrition, wellness"
                            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                        {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col">
                        <label htmlFor="imageUrl" className="text-lg font-semibold mb-2">
                            Image URL
                        </label>
                        <input
                            type="text"
                            id="imageUrl"
                            {...register("imageUrl")}
                            placeholder="Enter image URL..."
                            className="p-3 rounded-lg bg-gray-700 text-white outline-none"
                        />
                        {errors.imageUrl && <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                        <label htmlFor="content" className="text-lg font-semibold mb-2">
                            Content
                        </label>
                        <textarea
                            id="content"
                            {...register("content")}
                            rows="6"
                            placeholder="Write the blog content here..."
                            className="p-3 rounded-lg bg-gray-700 text-white outline-none resize-none"
                        ></textarea>
                        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                    </div>

                    {/* Submission Error */}
                    {errors.submit && <p className="text-red-500 text-sm mb-2">{errors.submit}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold shadow-md"
                    >
                        Update Blog
                    </button>
                </form>
            </div>
        </section>
    );
}
