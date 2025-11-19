import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-6 mt-20 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} PeisJournal. All rights reserved.
                </p>

                <div className="flex space-x-6 text-sm">
                    <Link
                        to="/about"
                        className="hover:text-white transition-colors"
                    >
                        About
                    </Link>

                    
                </div>
            </div>
        </footer>
    );
}
