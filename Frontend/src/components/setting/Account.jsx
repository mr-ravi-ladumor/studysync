import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

// Simple theme toggle utility
const getStoredTheme = () => {
    try {
        return localStorage.getItem("site-theme") || "dark"; // default dark
    } catch (e) {
        return "dark";
    }
};

const applyThemeClass = (theme) => {
    try {
        if (theme === "dark") document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
    } catch (e) {}
};

function Account() {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        // bio: "",
    });
    const [theme, setTheme] = useState(getStoredTheme());

    useEffect(() => {
        applyThemeClass(theme);
        try {
            localStorage.setItem("site-theme", theme);
        } catch (e) {}
    }, [theme]);

    // Update formData when user data is available
    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || "",
                bio:
                    user.bio ||
                    "Computer Science student at University of Technology. Passionate about web development and machine learning.",
            });
        }
    }, [user]);

    //   console.log(formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        // console.log("Saving changes:", formData);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/update`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(formData),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to save changes");
            }
            const userData = await response.json();
            // console.log("Changes saved successfully:", userData.data);
            login(userData.data);
        } catch (error) {
            console.log("Network error ! Error saving changes:", error);
        }
    };

    return (
        <div className="w-full space-y-12">
            {/* Profile Information Section */}
            <div className="bg-white rounded-lg  p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Profile Information
                </h3>

                {/* Profile Photo */}
                <div className="flex items-center space-x-6 mb-8">
                    <div className="relative">
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&background=10b981&color=fff&size=80`}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex space-x-4">
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                Change Photo
                            </button>
                            <button className="text-red-600 hover:text-red-700 font-medium">
                                Remove
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                            JPG, GIF or PNG. Max size 2MB.
                        </p>
                    </div>
                </div>

                {/* Name Fields */}
                <div className="flex w-full gap-6 mb-6">
                    {" "}
                    <div className="w-1/2">
                        <label
                            htmlFor="firstname"
                            className="block text-md font-medium text-gray-700 mb-2"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="w-1/2">
                        <label
                            htmlFor="lastname"
                            className="block text-md font-medium text-gray-700 mb-2"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="mb-6">
                    {" "}
                    <label
                        htmlFor="email"
                        className="block text-md font-medium text-gray-700 mb-2"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                {/* Bio Field */}
                <div className="mb-6">
                    {" "}
                    <label
                        htmlFor="bio"
                        className="block text-md font-medium text-gray-700 mb-2"
                    >
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        maxLength={200}
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Computer Science student at University of Technology. Passionate about web development and machine learning."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                    <p className="text-md text-gray-500 mt-1">
                        Brief description for your profile. Max 200 characters.
                    </p>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveChanges}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Account Information Section */}
            <div className="bg-white rounded-lg  p-6 w-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Account Information
                </h3>
                {/* Theme Toggle */}
                <div className="mb-4">
                    <label className="block text-md font-medium text-gray-700 mb-2">
                        Appearance
                    </label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setTheme("dark")}
                            className={`px-3 py-1 rounded ${
                                theme === "dark"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            Dark
                        </button>
                        <button
                            type="button"
                            onClick={() => setTheme("light")}
                            className={`px-3 py-1 rounded ${
                                theme === "light"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            Light
                        </button>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div>
                            <p className="text-md font-medium text-gray-900">
                                Account Status
                            </p>
                            <p className="text-md text-gray-500">
                                Your account is active
                            </p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                        </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div>
                            <p className="text-md font-medium text-gray-900">
                                Member Since
                            </p>
                            <p className="text-md text-gray-500">
                                January 2024
                            </p>
                        </div>
                    </div>
                    {/* delete account */}
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Account;
