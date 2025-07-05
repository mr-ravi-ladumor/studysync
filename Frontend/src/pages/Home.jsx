import { Link } from "react-router-dom";
import {
  RocketIcon,
  CalendarIcon,
  BookOpenIcon,
  LayoutDashboardIcon,
} from "lucide-react";

// Home.jsx - Main landing page for StudySync
// May Change Later or fix the design
function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f0fdf4] to-[#f0fdfa] text-gray-900 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="bg-white py-20 px-6 text-center rounded-b-[3rem] border-b-4 border-blue-300">
        <div className="flex flex-col items-center justify-center">
          <RocketIcon
            className="h-16 w-16 text-blue-600 mb-6 animate-bounce drop-shadow-xl"
            aria-label="StudySync Logo"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-blue-800 drop-shadow-xl">
            Welcome to <span className="text-green-500">StudySync</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-700 font-medium">
            Your personal study companion — stay organized, track progress, and
            access resources all in one place.
          </p>
          <Link to="/login">
            <button className="text-lg px-10 py-3 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-green-600 transition font-semibold">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-100 to-green-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform border-t-4 border-blue-400">
            <LayoutDashboardIcon className="mx-auto h-14 w-14 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-blue-800">Dashboard</h3>
            <p className="text-gray-700">
              Track your tasks and overall progress with your personalized
              dashboard.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform border-t-4 border-green-400">
            <BookOpenIcon className="mx-auto h-14 w-14 text-green-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              Resources
            </h3>
            <p className="text-gray-700">
              Upload and access study materials easily, and manage your notes
              efficiently.
            </p>
          </div>
          <div className="bg-white p-10 rounded-3xl shadow-2xl text-center hover:scale-105 transition-transform border-t-4 border-pink-400">
            <CalendarIcon className="mx-auto h-14 w-14 text-pink-600 mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-pink-800">Calendar</h3>
            <p className="text-gray-700">
              Stay on top of upcoming tasks and events using your integrated
              study calendar.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshot / Preview Section */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-800">
          Preview the Experience
        </h2>
        <div className="flex justify-center">
          <div className="w-full max-w-4xl aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl shadow-inner flex items-center justify-center text-gray-400 border-4 border-dashed border-blue-200">
            Dashboard Screenshot Here (replace with real image)
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-700 to-green-500 text-white text-center rounded-t-3xl mt-10 shadow-xl">
        <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">
          Start organizing your study life
        </h2>
        <p className="mb-6 text-lg">
          Sign up now and take control of your productivity and learning
          journey.
        </p>
        <Link to="/login">
          <button className="bg-white text-blue-700 hover:bg-blue-100 text-lg px-10 py-3 rounded-full font-semibold shadow-lg transition">
            Join StudySync
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 text-sm py-6 px-6 text-center mt-auto border-t-2 border-blue-200">
        Made with 💻 by Mr. Stark •{" "}
        <a href="https://github.com" className="underline hover:text-blue-400">
          GitHub
        </a>
      </footer>
    </div>
  );
}

export default Home;
