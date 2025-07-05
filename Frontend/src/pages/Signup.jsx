import React, {useState} from 'react'
import { Link } from "react-router-dom";
import { Eye , EyeOff} from 'lucide-react'

function Signup() {
    const [showPassword, setShowPassword] =  useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div className="min-h-screen  from-blue-50 bg-gradient-to-br to-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Signup to StudySync</h2> 
        <form className="space-y-6">
            <div>
                <label className="block text-md font-medium text-gray-700 mb-1" htmlFor="fullname">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your first name"
                    required
                />
            </div>
            <div>
                <label className="block text-md font-medium text-gray-700 mb-1" htmlFor="lastname">Last Name <span className='text-gray-600 text-sm'>(optional)</span></label>
                <input
                    type="text"
                    id="lastname"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your last name"
                />
            </div>
            <div>
                <label className="block text-md font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label className="block text-md font-medium text-gray-700 mb-1"
                          htmlFor="password">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your password"
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className='absolute text-gray-500 top-1/5 right-5 '
                        tabIndex={-1}
                    >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                    </button>
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
                Signup
            </button>
            <Link to="/login">
                <p className="text-sm text-center text-gray-600 mt-4">Already have an account? <span href="/login" className="text-green-600 hover:underline">Login</span>
            </p>
            </Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
