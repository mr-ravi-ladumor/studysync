import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [logoutLoading, setLogoutLoading] = useState(false);

    useEffect(() => {
        // console.log("useAuth :: AuthProvider useEffect called");
        try {
            const authUser = localStorage.getItem("user");
            // console.log("authUser", authUser)
            if (authUser) {
                // console.log("object")
                const userData = JSON.parse(authUser);
                setIsAuthenticated(true);
                setUser(userData);
            } else {
                setUser("");
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log("Error retrieving user from localStorage:", error);
            setUser("");
            setIsAuthenticated(false);
            localStorage.removeItem("user");
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        setError(false);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = async () => {
        setLogoutLoading(true);
        try {
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
            // ignore network errors; still clear client state
        } finally {
            setUser("");
            setIsAuthenticated(false);
            setError(false);
            localStorage.removeItem("user");
            setLogoutLoading(false);
        }
    };

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        error,
        setError,
        loading,
        logoutLoading,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
