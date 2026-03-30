import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ShieldCheck, KeyRound, ArrowRight, ArrowLeft } from "lucide-react";
import LoadingSpinner from "../components/utility/LoadingSpinner.jsx";

function ForgotPassword() {
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 1. Send OTP
    const handleSendOTP = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError("");
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgotPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setStep(2);
            } else {
                setError(data.message || "Failed to send OTP.");
            }
        } catch (err) {
            setError("Connection error.");
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError("");
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/verifyOTP`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await res.json();
            if (res.ok) {
                setStep(3);
            } else {
                setError(data.message || "Invalid OTP.");
            }
        } catch (err) {
            setError("Connection error.");
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Reset Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setError("");
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/resetPassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await res.json();
            if (res.ok) {
                navigate("/login");
                // You could also show a success toast here
            } else {
                setError(data.message || "Failed to reset password.");
            }
        } catch (err) {
            setError("Connection error.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-50 rounded-full blur-[120px] opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-gray-50 rounded-full blur-[100px] opacity-60" />

            <div className="w-full max-w-[440px] z-10 transition-all duration-500">
                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-10 border border-gray-50">
                    
                    {/* Header */}
                    <div className="text-center mb-10">
                         <img 
                            src="/logo.svg" 
                            alt="StudySync Logo" 
                            className="w-16 h-16 mx-auto mb-6 transform -rotate-6 transition-transform duration-300"
                        />
                        <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">
                            {step === 1 && "Forgot Password?"}
                            {step === 2 && "Verify OTP"}
                            {step === 3 && "Set New Password"}
                        </h2>
                        <p className="text-gray-500 mt-2 font-medium text-sm">
                            {step === 1 && "No worries! Enter your email to get an OTP."}
                            {step === 2 && `We've sent a 6-digit code to your email.`}
                            {step === 3 && "Enter your new strong password below."}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                             <p className="text-red-700 text-sm font-semibold">{error}</p>
                        </div>
                    )}

                    {/* STEP 1: EMAIL */}
                    {step === 1 && (
                        <form className="space-y-6" onSubmit={handleSendOTP}>
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e]">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>
                            <button disabled={isLoading} type="submit" className="group w-full bg-[#22c55e] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-100 flex items-center justify-center gap-2">
                                {isLoading ? <LoadingSpinner size="h-5 w-5" color="border-white" /> : "Send OTP"}
                                {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                            </button>
                        </form>
                    )}

                    {/* STEP 2: OTP */}
                    {step === 2 && (
                        <form className="space-y-6" onSubmit={handleVerifyOTP}>
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">6-Digit OTP</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e]">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white text-center tracking-[10px] text-xl font-bold"
                                        placeholder="000000"
                                        required
                                    />
                                </div>
                            </div>
                            <button disabled={isLoading} type="submit" className="group w-full bg-[#22c55e] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-100 flex items-center justify-center gap-2">
                                {isLoading ? <LoadingSpinner size="h-5 w-5" color="border-white" /> : "Verify OTP"}
                            </button>
                            <button type="button" onClick={() => setStep(1)} className="w-full text-xs font-bold text-gray-400 hover:text-[#22c55e] flex items-center justify-center gap-1">
                                <ArrowLeft size={14} /> Back to Email
                            </button>
                        </form>
                    )}

                    {/* STEP 3: NEW PASSWORD */}
                    {step === 3 && (
                        <form className="space-y-6" onSubmit={handleResetPassword}>
                            <div className="space-y-2">
                                <label className="text-[12px] font-bold text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#22c55e]">
                                        <KeyRound size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-[#22c55e] focus:bg-white"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                            <button disabled={isLoading} type="submit" className="group w-full bg-[#22c55e] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-100 transition-all">
                                {isLoading ? <LoadingSpinner size="h-5 w-5" color="border-white" /> : "Reset Password"}
                            </button>
                        </form>
                    )}

                    {/* Footer Link */}
                    <div className="mt-10 text-center">
                        <Link to="/login" className="inline-block text-[#111827] font-extrabold text-sm hover:text-[#22c55e] transition-colors uppercase tracking-widest border-b-2 border-green-100">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
