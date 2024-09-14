// src/AdminView/Dashboard.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import CityMgt from "./CityMgt";
import EvtMgt from "./EvtMgt";
import StateMgt from "./StateMgt";
import UserMgt from "./usermgt";

const Dashboard = () => {
  return (
    <>
      {/* <Router> */}
      <div style={{ display: "flex" }}>
        {/* Sidebar stays static on the left */}
        <Sidebar />

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            {/* Define routes for each management page */}
            {/* <Route path="state-management" element={<StateMgt />} />
            <Route path="city-management" element={<CityMgt />} />
            <Route path="user-management" element={<UserMgt />} />
            <Route path="event-management" element={<EvtMgt />} /> */}
            <Route path="state-management" element={<StateMgt />} />
            <Route path="city-management" element={<CityMgt />} />
            <Route path="user-management" element={<UserMgt />} />
            <Route path="event-management" element={<EvtMgt />} />
            {/* Default dashboard home page */}
            <Route path="/" element={<h1>Welcome to Admin Dashboard</h1>} />
          </Routes>
          <Outlet />
        </div>
      </div>
      {/* </Router> */}
    </>
  );
};

export default Dashboard;
