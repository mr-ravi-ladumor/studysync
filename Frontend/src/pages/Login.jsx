import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import LoadingSpinner from "../components/utility/LoadingSpinner.jsx";

function Login() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onSubmitLogin = async (e) => {
        e.preventDefault();

        const validateData = () => {
            const { email, password } = formData;
            if (!email || !password) {
                setError("Please fill in all required fields.");
                return false;
            }
            if (password.length < 3) {
                setError("Password must be at least 3 characters long.");
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
                setError(errorData.message || "Login failed, please try again.");
            }
        } catch (error) {
            setError("Connection error, please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-gray-50 rounded-full blur-[100px] opacity-60" />

            <div className="w-full max-w-[440px] z-10 transition-all duration-500">
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 border border-gray-50">
                    
                   
                    <div className="text-center mb-12">
                         <img 
                            src="/logo.svg" 
                            alt="StudySync Logo" 
                            className="w-20 h-20 mx-auto mb-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                        />
                        <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">Welcome Back</h2>
                        <p className="text-gray-500 mt-3 font-medium">Continue your work with StudySync</p>
                    </div>

                   
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-2xl animate-in fade-in slide-in-from-top-2">
                             <p className="text-red-700 text-sm font-semibold flex items-center gap-2">
                                <span>{error}</span>
                             </p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={onSubmitLogin}>
                        {/* Email Input */}
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
                                    className="w-full pl-14 pr-5 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white transition-all duration-300 placeholder:text-gray-300"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest" htmlFor="password">Password</label>
                                <a href="#" className="text-xs font-bold text-[#22c55e] hover:opacity-80 transition-opacity">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e] transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-14 pr-14 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white transition-all duration-300 placeholder:text-gray-300"
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

                        {/* Login Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full bg-[#22c55e] hover:bg-[#1fb355] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-100 transition-all duration-300 active:scale-[0.98] disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <LoadingSpinner size="h-5 w-5" color="border-white" />
                                        <span className="tracking-wide">Checking...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>Login In Now</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-400 font-medium">
                            Don't have an account yet?
                        </p>
                        <Link to="/signup" className="mt-2 inline-block text-[#111827] font-extrabold text-sm hover:text-[#22c55e] transition-colors uppercase tracking-widest border-b-2 border-green-100">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
