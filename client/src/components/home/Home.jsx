export default function Home() {
  const blogs = [
    {
      id: 1,
      title: "The Rise of AI in Everyday Life",
      author: "Jane Doe",
      date: "2025-11-19",
      content:
        "Artificial Intelligence is becoming increasingly prevalent in our daily lives...",
      imageUrl: "/1.jpg",
    },
    {
      id: 2,
      title: "10 Tips for a Healthier Lifestyle",
      author: "John Smith",
      date: "2025-11-18",
      content:
        "Living a healthy lifestyle doesn't have to be hard. Start with these tips...",
      imageUrl: "/2.jpg",
    },
    {
      id: 3,
      title: "Exploring the Wonders of Space",
      author: "Alice Johnson",
      date: "2025-10-25",
      content: "Space exploration has fascinated humans for centuries...",
      imageUrl: "/3.jpg",
    },
    {
      id: 4,
      title: "Mastering the Art of Cooking",
      author: "Michael Brown",
      date: "2025-11-01",
      content: "Cooking is both an art and a science...",
      imageUrl: "/4.jpg",
    },
  ];

  const featured = blogs[0];
  const sideBlogs = blogs.slice(1, 4);

  return (
    <section className="w-full bg-gray-900 text-white py-6 min-h-[80.8vh]">
      <div className="w-full lg:w-[95%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <img
            src={featured.imageUrl}
            alt={featured.title}
            className="w-full h-56 lg:h-64 object-cover"
          />

          <div className="p-4 flex flex-col flex-grow">
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">{featured.title}</h1>
            <p className="text-gray-400 text-xs lg:text-sm mb-2">
              {featured.author} • {featured.date}
            </p>

            <p className="text-gray-300 flex-grow text-sm lg:text-base leading-snug">
              {featured.content.substring(0, 150)}...
            </p>

            <button className="mt-3 w-fit px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition text-sm">
              Read More
            </button>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          {sideBlogs.map((b) => (
            <div
              key={b.id}
              className="bg-gray-800 rounded-xl shadow-md flex overflow-hidden"
            >
              <img
                src={b.imageUrl}
                alt={b.title}
                className="w-32 lg:w-36 object-cover aspect-[4/3]"
              />

              <div className="p-3 flex flex-col flex-grow">
                <h2 className="text-lg lg:text-xl font-semibold leading-tight">
                  {b.title}
                </h2>

                <p className="text-gray-400 text-xs mt-0.5">
                  {b.author} • {b.date}
                </p>

                <p className="text-gray-300 text-sm mt-1 flex-grow">
                  {b.content.substring(0, 80)}...
                </p>

                <button className="mt-2 w-fit px-3 py-1.5 bg-green-500 hover:bg-green-600 rounded-lg text-xs lg:text-sm font-semibold transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


