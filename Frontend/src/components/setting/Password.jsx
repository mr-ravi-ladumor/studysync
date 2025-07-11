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

  const onSubmitChangPassword = async (e) => {
    e.preventDefault();
    
    console.log("Form submitted with data:", formData);
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
              className="block text-md font-medium text-gray-700 mb-1"
              htmlFor="currentPassword"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                type={!showPassword.current ? "text" : "password"}
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                name="current"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute text-gray-500 top-1/5 right-5 "
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
              className="block text-md font-medium text-gray-700 mb-1"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={!showPassword.new ? "text" : "password"}
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                name="new"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute text-gray-500 top-1/5 right-5 "
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
              className="block text-md font-medium text-gray-700 mb-1"
              htmlFor="confirmPassword"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={!showPassword.confirm ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                name="confirm"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute text-gray-500 top-1/5 right-5 "
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
        <div className="flex justify-end">
          <button
            onClick={onSubmitChangPassword}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Password;
