import Navbar from "./shared/Navbar";

const AboutPage = () => {
    return (
        <>
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 py-12">
                
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-indigo-600 mb-4">
                        About Our Job Portal
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Connecting talented students with top recruiters.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-3">
                        🎯 Our Mission
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our mission is to bridge the gap between students 
                        and recruiters by providing a simple, fast, and 
                        reliable job search experience. We aim to help 
                        students find their dream jobs and assist recruiters 
                        in discovering top talent efficiently.
                    </p>
                </div>

                {/* Features Section */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">
                        🚀 What We Offer
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 bg-indigo-50 rounded-xl shadow">
                            <h3 className="font-semibold mb-2">
                                Easy Job Search
                            </h3>
                            <p className="text-sm text-gray-600">
                                Search and filter jobs easily with keyword 
                                and location.
                            </p>
                        </div>

                        <div className="p-6 bg-indigo-50 rounded-xl shadow">
                            <h3 className="font-semibold mb-2">
                                Save Jobs
                            </h3>
                            <p className="text-sm text-gray-600">
                                Save jobs to view later and track your 
                                applications.
                            </p>
                        </div>

                        <div className="p-6 bg-indigo-50 rounded-xl shadow">
                            <h3 className="font-semibold mb-2">
                                Recruiter Dashboard
                            </h3>
                            <p className="text-sm text-gray-600">
                                Recruiters can post jobs and manage 
                                applications efficiently.
                            </p>
                        </div>

                        <div className="p-6 bg-indigo-50 rounded-xl shadow">
                            <h3 className="font-semibold mb-2">
                                Real-Time Notifications
                            </h3>
                            <p className="text-sm text-gray-600">
                                Get notified instantly when new jobs are 
                                posted.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div>
                    <h2 className="text-2xl font-semibold mb-3">
                        📩 Contact Us
                    </h2>
                    <p className="text-gray-700">
                        Email: support@jobportal.com
                    </p>
                </div>

            </div>
        </>
    );
};

export default AboutPage;