import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // console.log("useAuth :: AuthProvider useEffect called");
        try {
            const authUser = localStorage.getItem('user');
            // console.log("authUser", authUser)
            if(authUser) {
                // console.log("object")
                const userData = JSON.parse(authUser);
                setIsAuthenticated(true);
                setUser(userData);
            }
            else {
                setUser('');
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log("Error retrieving user from localStorage:", error);
            setUser('');
            setIsAuthenticated(false);
            localStorage.removeItem('user');
        }
    }, []);

    const login =  (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        setError(false);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = async (userData) => {
        setUser('');
        setIsAuthenticated(false);
        setError(false);
        localStorage.removeItem('user');   
    }

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        error,
        setError,
        loading,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}