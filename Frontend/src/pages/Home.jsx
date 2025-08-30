import { Link } from "react-router-dom";
import {
    Plus,
    CalendarIcon,
    BookOpenIcon,
    LayoutDashboardIcon,
    CheckCircle,
    Settings,
} from "lucide-react";

// Main landing page for StudySync
function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 flex flex-col font-sans">
            {/* Hero Section */}
            <section
                className="bg-white py-24 px-6 relative overflow-hidden"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-50"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-8">
                        <div className="bg-green-400 rounded-xl p-4 shadow-lg">
                            <Plus className="h-16 w-16 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        Organize Your Study Life with{" "}
                        <span className="text-green-500">StudySync</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Stay on top of your tasks, manage your resources, and
                        never miss important deadlines. Your all-in-one study
                        companion.
                    </p>
                    <Link to="/signup">
                        <button className="bg-green-500 text-white px-12 py-4 rounded-lg hover:bg-green-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Get Started
                        </button>
                    </Link>
                    <p className="mt-4 text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-green-500 hover:text-green-600 font-medium"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything You Need to Stay Organized
                        </h2>
                        <p className="text-xl text-gray-600">
                            Powerful features designed for students who want to
                            maximize their productivity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                                <LayoutDashboardIcon className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                Dashboard
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Track tasks, view progress, and get insights
                                into your study habits.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                                <CheckCircle className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                Task Management
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Create, organize, and track tasks with
                                priorities and due dates.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                                <CalendarIcon className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                Calendar
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Schedule events and view your study plan in
                                calendar format.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-orange-100 rounded-lg p-3 w-fit mb-4">
                                <BookOpenIcon className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                Resources
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Store and organize study materials by subject
                                for easy access.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 mb-12">
                        Get started in just a few simple steps.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                Create Your Account
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Sign up quickly and set up your personalized
                                study space.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                Add Tasks & Resources
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Organize your study materials and create tasks
                                with deadlines.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-900">
                                Stay Organized
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Track progress, view your calendar, and achieve
                                your goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-lg mb-4">
                        Built for students, by students. Experience the
                        difference.
                    </p>
                    <p className="text-gray-400 mb-8">
                        StudySync helps you stay organized and focused on what
                        matters most.
                    </p>
                    <p className="text-gray-500 text-sm mt-8">
                        © 2025 StudySync. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
