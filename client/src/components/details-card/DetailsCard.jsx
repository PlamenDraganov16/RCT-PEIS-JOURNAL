export default function DetailsCard({
    imageUrl,
    title,
    author,
    date,
    content,
    tags
}) {
    return (
        <>

            <div className="w-full rounded-xl overflow-hidden shadow-xl">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-64 lg:h-96 object-cover"
                />
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col gap-4">
                <h1 className="text-3xl lg:text-4xl font-bold">{title}</h1>

                <p className="text-gray-400 text-sm">
                    {author} • {date}
                </p>

                <p className="text-gray-300 text-base leading-relaxed whitespace-pre-line">
                    {content}
                </p>

                {tags && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        {tags.map(tag => (
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

        </>
    )
}