import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Importing pages
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Layout from "../components/layout/Layout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Resources from "../pages/Resources.jsx";
import Calendar from "../pages/Calendar.jsx";
import Settings from "../pages/Settings.jsx";

// Simple guard for authenticated routes
function RequireAuth({ children }) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
        );
    }
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
                path="/"
                element={
                    <RequireAuth>
                        <Layout />
                    </RequireAuth>
                }
            >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="resources" element={<Resources />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Route>
    )
);
export default router;
