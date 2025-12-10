import { Link } from "react-router";

export default function NotFound() {
    return (
        <section className="bg-gray-900 text-white min-h-screen flex items-center justify-center px-4">
            <div className="max-w-2xl text-center space-y-8">

                {/* 404 Title */}
                <h1 className="text-6xl font-bold">404</h1>

                {/* Message Card */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-4">
                    <h2 className="text-2xl font-semibold">Page Not Found</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Sorry, the page you are looking for does not exist. It might have been moved or deleted.
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                        Go Back 
                    </Link>
                </div>

            </div>
        </section>
    );
}