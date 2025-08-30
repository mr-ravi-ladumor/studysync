import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LoadingSpinner from "../components/utility/LoadingSpinner.jsx";

function Signup() {
    const { login } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

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

        if (!validateData()) {
            return;
        }

        try {
            setIsLoading(true);
            setError("");
            const responseSignup = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            // removed artificial delay for snappier UX

            if (responseSignup.ok) {
                // auto-login after signup
                try {
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
                        // console.log("Signup successful:", userData);
                        login(userData.data.user);
                        navigate("/dashboard");
                    } else {
                        const errorData = await response.json();
                        // console.log("Auto-login failed:", errorData);
                        if (errorData.message) {
                            setError(errorData.message);
                        } else {
                            setError(
                                "Account Created, please try logging in manually."
                            );
                        }
                        navigate("/login");
                    }
                } catch (error) {
                    console.error("Auto-login error:", error);
                    setError(
                        "Connection error during auto-login, please try logging in manually."
                    );
                    navigate("/login");
                }
            } else {
                const errorData = await responseSignup.json();
                // console.log("Signup failed:", errorData);
                if (errorData.message) {
                    setError(errorData.message);
                } else {
                    setError("Signup failed, please try again.");
                }
            }
        } catch (error) {
            console.error("network error:", error);
            setError("Connection error, please try again later.");
        } finally {
            setIsLoading(false);
            setFormData({
                firstname: "",
                lastname: "",
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
                    Signup to StudySync
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
                        <p>Creating your account...</p>
                    </div>
                )}
                <form className="space-y-6" onSubmit={onSubmitSignup}>
                    <div>
                        <label
                            className="block text-md font-medium text-gray-700 mb-1"
                            htmlFor="fullname"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            value={formData.firstname}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    firstname: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="block text-md font-medium text-gray-700 mb-1"
                            htmlFor="lastname"
                        >
                            Last Name{" "}
                            <span className="text-gray-600 text-sm">
                                (optional)
                            </span>
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            value={formData.lastname}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    lastname: e.target.value,
                                })
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your last name"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-md font-medium text-gray-700 mb-1"
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
                                tabIndex={-1}
                                className="absolute text-gray-500 top-1/5 right-5 "
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
                        disabled={isLoading}
                    >
                        Signup
                    </button>
                    <Link to="/login">
                        <p className="text-sm text-center text-gray-600 mt-4">
                            Already have an account?{" "}
                            <span
                                href="/login"
                                className="text-green-600 hover:underline"
                            >
                                Login
                            </span>
                        </p>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
