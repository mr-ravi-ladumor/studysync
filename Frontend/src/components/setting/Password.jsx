import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Password() {
  const [showPassword, setShowPassword] = useState({
    current: true,
    new: true,
    confirm: true,
  });
  // const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = (field) => {
    // console.log("Toggling password visibility for:", e.target);
    setShowPassword((prevState) => ({
        ...prevState,
        [field]: !prevState[field]
    }))
  };

  const onSubmitChangePassword = async (e) => {
    e.preventDefault();
    
    try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/changePassword`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
    }

    console.log("Password changed successfully:", data);

    setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    setShowPassword({
        current: true,
        new: true,
        confirm: true,
    });

    alert("Password changed successfully");

} catch (error) {
    console.error("Error changing password:", error);
    alert(`Error: ${error.message}`);
}

  };
  return (
    <div className="bg-white p-6 rounded-lg">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
        <p className="text-gray-600 text-medium">
          To change your password, please enter your current password and the
          new password.
        </p>
      </div>
      <form className="">
        <div className="space-y-4 mt-8 mb-6">
          {/* Current Password  */}
          <div>
            <label
              className="form-label"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <div className="relative group">
              <input
                type={!showPassword.current ? "text" : "password"}
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                name="current"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#111827] transition-colors"
                tabIndex={-1}
              >
                {showPassword.current ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

            {/* New Password */}
          <div>
            <label
              className="form-label"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative group">
              <input
                type={!showPassword.new ? "text" : "password"}
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                name="new"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#111827] transition-colors"
                tabIndex={-1}
              >
                {showPassword.new ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

            {/* Confirm New Password */}
          <div>
            <label
              className="form-label"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <div className="relative group">
              <input
                type={!showPassword.confirm ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                name="confirm"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-[#111827] transition-colors"
                tabIndex={-1}
              >
                {showPassword.confirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onSubmitChangePassword}
            className="btn-primary"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Password;
