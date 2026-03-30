import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import DangerZone from "./DangerZone";

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
        bio: "",
    });
    const [theme, setTheme] = useState(getStoredTheme());

    useEffect(() => {
        applyThemeClass(theme);
        try {
            localStorage.setItem("site-theme", theme);
        } catch (e) {}
    }, [theme]);

    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || "",
                lastname: user.lastname || "",
                email: user.email || "",
                bio: user.bio || "",
            });
        }
    }, [user]);

    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const avatarData = new FormData();
        avatarData.append("avatar", file);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/updateAvatar`,
                {
                    method: "PUT",
                    credentials: "include",
                    body: avatarData,
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update avatar");
            }
            const userData = await response.json();
            login(userData.data);
        } catch (error) {
            console.log("Network error ! Error updating avatar:", error);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
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
                            src={user.avatarUrl ? user.avatarUrl : `https://ui-avatars.com/api/?name=${user?.firstname}+${user?.lastname}&background=10b981&color=fff&size=80`}
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex space-x-4">
                            <label 
                                htmlFor="avatar" 
                                className="text-blue-600 hover:text-blue-700 font-medium">
                                Change Photo
                            </label>
                            <input 
                                type='file' 
                                id="avatar" 
                                name="avatar" 
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                            <button 
                                className="text-red-600 hover:text-red-700 font-medium">
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
                    <div className="w-1/2">
                        <label
                            htmlFor="firstname"
                            className="form-label"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="w-1/2">
                        <label
                            htmlFor="lastname"
                            className="form-label"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div className="mb-6">
                    {" "}
                    <label
                        htmlFor="email"
                        className="form-label"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>

                {/* Bio Field */}
                <div className="mb-6">
                    {" "}
                    <label
                        htmlFor="bio"
                        className="form-label"
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
                        placeholder="Write your bio here..."
                        className="form-input resize-none"
                    />
                    <p className="text-md text-gray-500 mt-1">
                        Brief description for your profile. Max 200 characters.
                    </p>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSaveChanges}
                        className="btn-primary"
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            <DangerZone />
        </div>
    );
}

export default Account;
