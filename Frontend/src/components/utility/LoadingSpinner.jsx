import React from "react";

const LoadingSpinner = ({ size = "h-6 w-6", color = "border-blue-500" }) => {
    return (
        <div
            className={`animate-spin rounded-full border-2 border-t-transparent ${size} ${color}`}
        ></div>
    );
};

export default LoadingSpinner;
