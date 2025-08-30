import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Include cookies in the request
                    body: JSON.stringify(formData),
                }
            );
            

            if (response.ok) {
                const userData = await response.json();
                // console.log("Login successful:", userData.data.user);
                login(userData.data.user);
                setError("");
                navigate("/dashboard");
            } else {
                const errorData = await response.json();
                // console.log("Login failed:", errorData);
                if (errorData.message) {
                    setError(errorData.message);
                } else {
                    setError("Login failed, please try again.");
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Connection error, please try again later.");
        } finally {
            setIsLoading(false);
            setFormData({
                email: "",
                password: "",
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="min-h-screen  from-blue-50 bg-gradient-to-br to-green-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Login to StudySync
                </h2>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}
                {isLoading && (
                    <div className="flex items-center justify-center gap-2 text-green-500 mb-4">
                        <LoadingSpinner
                            size="h-5 w-5"
                            color="border-green-500"
                        />
                        <p>Logging in, please wait...</p>
                    </div>
                )}
                <form className="space-y-6" onSubmit={onSubmitLogin}>
                    <div>
                        <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="block text-md font-medium text-gray-700 mb-1"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute text-gray-500 top-1/5 right-5 "
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
                        disabled={isLoading}
                        className="w-full bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                        Login
                    </button>
                    <Link to="/signup">
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Don't have an account?{" "}
                            <span
                                href="/signup"
                                className="text-green-600 hover:underline"
                            >
                                Sign up
                            </span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
