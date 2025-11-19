export default function About() {
    return (
        <section className="bg-gray-900 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Section Title */}
                <h2 className="text-4xl font-bold text-center">About PeisJournal</h2>

                {/* Our Mission */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-4">
                    <h3 className="text-2xl font-semibold">Our Mission</h3>
                    <p className="text-gray-300 leading-relaxed">
                        PeisJournal is a platform dedicated to writers and readers alike.
                        Our mission is to create a space where storytellers can share their
                        experiences, ideas, and creativity with a global audience.
                    </p>
                </div>

                {/* Our Vision */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-4">
                    <h3 className="text-2xl font-semibold">Our Vision</h3>
                    <p className="text-gray-300 leading-relaxed">
                        We envision a community where writers are inspired to grow, readers
                        are engaged, and stories connect people across the world. Every
                        story matters, and every voice deserves to be heard.
                    </p>
                </div>

                {/* Why PeisJournal */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg space-y-4">
                    <h3 className="text-2xl font-semibold">Why PeisJournal?</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Unlike other blogging platforms, PeisJournal focuses on building a
                        supportive and creative community. Our tools are simple, our design
                        is clean, and our goal is to let your stories shine without
                        distractions.
                    </p>
                </div>
            </div>
        </section>
    );
}
