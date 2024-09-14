// src/HomePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [showAdminButtons, setShowAdminButtons] = useState(false);
  const [showUserButtons, setShowUserButtons] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Event Management System</h1>

      {/* Admin Button */}
      <div>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => {
            setShowAdminButtons(!showAdminButtons);
            setShowUserButtons(false); // Close user buttons when Admin is clicked
          }}
        >
          Admin
        </button>
        {showAdminButtons && (
          <div>
            <button
              style={{ margin: "10px", padding: "10px 20px" }}
              onClick={() => navigate("/admin-login")}
            >
              Admin Login
            </button>
            <button
              style={{ margin: "10px", padding: "10px 20px" }}
              onClick={() => navigate("/admin-register")}
            >
              Admin Register
            </button>
          </div>
        )}
      </div>

      {/* User Button */}
      <div>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={() => {
            setShowUserButtons(!showUserButtons);
            setShowAdminButtons(false); // Close admin buttons when User is clicked
          }}
        >
          User
        </button>
        {showUserButtons && (
          <div>
            <button
              style={{ margin: "10px", padding: "10px 20px" }}
              onClick={() => navigate("/user-login")}
            >
              User Login
            </button>
            <button
              style={{ margin: "10px", padding: "10px 20px" }}
              onClick={() => navigate("/user-register")}
            >
              User Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
