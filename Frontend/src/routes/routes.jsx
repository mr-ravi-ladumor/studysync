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
import Layout from "../components/layout/Layout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Resources from "../pages/Resources.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/" element={<Layout/>} >
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="resources" element={<Resources/>} />
        </Route>
    </Route>

  )
);
export default router;
