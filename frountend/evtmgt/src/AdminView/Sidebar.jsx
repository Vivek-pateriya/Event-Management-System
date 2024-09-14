// src/AdminView/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h2>Admin Dashboard</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ margin: "15px 0" }}>
          <Link
            to="state-management"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            State Management
          </Link>
        </li>
        <li style={{ margin: "15px 0" }}>
          <Link
            to="city-management"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            City Management
          </Link>
        </li>
        <li style={{ margin: "15px 0" }}>
          <Link
            to="user-management"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            User Management
          </Link>
        </li>
        <li style={{ margin: "15px 0" }}>
          <Link
            to="event-management"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Event Management
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
