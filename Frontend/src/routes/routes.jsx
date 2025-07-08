import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Importing pages
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Dashboard from "../pages/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

        {/* Add more routes as needed */}
    </>

  )
);
export default router;
