// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import AdminLogin from "./AdminView/AdminLogin";
import AdminRegister from "./AdminView/AdminReg";
import UserLogin from "./UserView/UserLogin";
import UserRegister from "./UserView/UserReg";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin-login/*" element={<AdminLogin />} />
        <Route path="/admin-register/*" element={<AdminRegister />} />

        {/* User Routes */}
        <Route path="user-login/*" element={<UserLogin />} />
        <Route path="user-register/*" element={<UserRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
