import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from "lucide-react";
import LoadingSpinner from "../components/utility/LoadingSpinner.jsx";

function Signup() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const onSubmitSignup = async (e) => {
        e.preventDefault();

        const validateData = () => {
            const { firstname, lastname, email, password } = formData;

            if (!firstname || !email || !password) {
                setError("Please fill in all required fields.");
                return false;
            }
            if (password.length < 3) {
                setError("Password must be at least 3 characters long.");
                return false;
            }
            if (!/^[a-zA-Z]+$/.test(firstname)) {
                setError("Firstname can only contain letters.");
                return false;
            }
            if (lastname && !/^[a-zA-Z]+$/.test(lastname)) {
                setError("Lastname can only contain letters.");
                return false;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError("Please enter a valid email address.");
                return false;
            }
            return true;
        };

        if (!validateData()) return;

        try {
            setIsLoading(true);
            setError("");
            const responseSignup = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (responseSignup.ok) {
                try {
                    const response = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            credentials: "include",
                            body: JSON.stringify(formData),
                        }
                    );

                    if (response.ok) {
                        const userData = await response.json();
                        login(userData.data.user);
                        navigate("/dashboard");
                    } else {
                        const errorData = await response.json();
                        setError(errorData.message || "Account Created, please try logging in manually.");
                        navigate("/login");
                    }
                } catch (error) {
                    setError("Connection error during auto-login, please try logging in manually.");
                    navigate("/login");
                }
            } else {
                const errorData = await responseSignup.json();
                setError(errorData.message || "Signup failed, please try again.");
            }
        } catch (error) {
            setError("Connection error, please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-gray-50 rounded-full blur-[100px] opacity-60" />

            <div className="w-full max-w-[440px] z-10 transition-all duration-500 my-8">
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 border border-gray-50">
                    
                    <div className="text-center mb-10">
                         <img 
                            src="/logo.svg" 
                            alt="StudySync Logo" 
                            className="w-20 h-20 mx-auto mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                        />
                        <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">Create Account</h2>
                        <p className="text-gray-500 mt-2 font-medium">Join StudySync today</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-2xl animate-in fade-in slide-in-from-top-2">
                             <p className="text-red-700 text-sm font-semibold flex items-center gap-2">
                                <span>{error}</span>
                             </p>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={onSubmitSignup}>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="firstname">First Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e] transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        id="firstname"
                                        value={formData.firstname}
                                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white transition-all duration-300 placeholder:text-gray-300 text-gray-900"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="lastname">Last Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e] transition-colors">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        id="lastname"
                                        value={formData.lastname}
                                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white transition-all duration-300 placeholder:text-gray-300 text-gray-900"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="email">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e] transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-14 pr-5 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white transition-all duration-300 placeholder:text-gray-300 text-gray-900"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest ml-1" htmlFor="password">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-14 pr-14 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white transition-all duration-300 placeholder:text-gray-300 text-gray-900"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#111827] transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Signup Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full bg-[#22c55e] hover:bg-[#1fb355] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <LoadingSpinner size="h-5 w-5" color="border-white" />
                                        <span className="tracking-wide">Creating...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Sign Up Now</span>
                                        <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-10 text-center">
                        <p className="text-gray-400 font-medium">
                            Already have an account?
                        </p>
                        <Link to="/login" className="mt-2 inline-block text-[#111827] font-extrabold text-sm hover:text-[#22c55e] transition-colors uppercase tracking-widest border-b-2 border-green-100">
                            Login Here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
