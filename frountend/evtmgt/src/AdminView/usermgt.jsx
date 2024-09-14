import React, { useState } from "react";
import axios from "axios";
import "../index.css";
// import { Route, Routes, Link } from 'react-router-dom';

function Usermgt() {
  const [Ctlist, setCtList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowButton = () => {
    setLoading(true);
    axios
      .get("http://localhost:5050/user/getUsercount")
      .then((res) => {
        setCtList(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load customer data.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateStatusC = (Cid, currentStatus) => {
    const updatedStatus = currentStatus === "active" ? "deactive" : "active";
    const obj2 = { Cid, CStatus: updatedStatus };

    axios
      .put("http://localhost:5050/user/toggle", obj2)
      .then((res) => {
        console.log("Status update response:", res.data);
        handleShowButton();
      })
      .catch((err) => {
        console.error("Error updating status:", err);
        alert("Failed to update status.");
      });
  };

  return (
    <>
      <div className="user-management">
        <center>
          <h6>User Management</h6>
          <div className="mydiv">
            <table>
              <tbody>
                <tr>
                  <td>Customer Approval List</td>
                  <td>
                    <button
                      type="button"
                      onClick={handleShowButton}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "User Show"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </center>
        <center>
          <table>
            <thead>
              <tr>
                <th>UserId</th>
                <th>userpass</th>
                <th>UserName</th>
                <th>State ID</th>
                <th>City Id</th>
                <th>UAddress</th>
                <th>UEmail</th>
                <th>UContact</th>
                <th>UPicName</th>
                <th>Uid</th>
                <th>UStatus</th>
              </tr>
            </thead>
            <tbody>
              {Ctlist.map((item, index) => (
                <tr key={index}>
                  <td>{item.USerId}</td>
                  <td>{item.UserPass}</td>
                  <td>{item.UserName}</td>
                  <td>{item.StId}</td>
                  <td>{item.CtId}</td>
                  <td>{item.UAddress}</td>
                  <td>{item.UEmail}</td>
                  <td>{item.UConatct}</td>
                  <td>{item.UPicName}</td>
                  <td>{item.Uid}</td>
                  <td>{item.UStatus}</td>
                  <td className="td">
                    <button
                      className="btn btn-outline-warning"
                      type="button"
                      onClick={() =>
                        handleUpdateStatusC(item.Uid, item.UStatus)
                      }
                    >
                      {item.CStatus === "active" ? "Deactive" : "Active"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </center>
      </div>
    </>
  );
}

export default Usermgt;
