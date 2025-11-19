export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column */}
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-4xl font-bold">PeisJournal</h1>
          <p className="text-lg text-gray-300">
            Share your stories. Connect with writers.
          </p>
          <p className="text-gray-400 max-w-md">
            PeisJournal is a platform for writers to publish their thoughts, 
            share experiences, and discover amazing stories from around the world.
          </p>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-4 items-center md:items-start">
          <button className="w-full md:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition">
            Login
          </button>
          <button className="w-full md:w-auto px-6 py-3 border border-green-500 text-green-500 hover:bg-green-600 hover:text-white rounded-lg text-lg font-semibold transition">
            Register
          </button>
          <p className="text-gray-400 text-sm mt-2">
            Only registered users can post blogs.
          </p>
        </div>
      </div>
    </div>
  );
}
