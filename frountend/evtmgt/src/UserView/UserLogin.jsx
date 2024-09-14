import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Eventview from "./Eventview";
function CustomerLogin() {
  const [CUSerId, setCUSerId] = useState("");
  const [CUserPass, setCUserPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userData, setUserData] = useState(null); // Store user data after login

  const handleCUSerId = (evt) => {
    setCUSerId(evt.target.value);
  };

  const handleCUserPass = (evt) => {
    setCUserPass(evt.target.value);
  };

  const handleLoginButton = () => {
    let obj = {
      USerId: CUSerId,
      UserPass: CUserPass,
    };
    // console.log(obj);

    axios
      .post("http://localhost:5050/user/login", obj)
      .then((res) => {
        console.log("Response from server:", res.data);
        if (
          res.data === "Invalid ID or password" ||
          res.data === "Something went wrong"
        ) {
          alert("Invalid ID or password & Login failed");
        } else {
          alert("Login success");
          const obj2 = {
            ufname: res.data.UserName,
            upicname: res.data.UPicName,
            uid: res.data.Uid,
          };
          console.log(obj2);
          // const root = ReactDOM.createRoot(document.getElementById('root'));
          // root.render(<CustomerHome data={obj2} />);
          setUserData(obj2);
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      });
  };
  if (isLoggedIn && userData) {
    // Render the Usermgt component if logged in
    return (
      <>
        <Eventview />
      </>
    );
  }

  return (
    <div className="container">
      <center>
        <h1>Login</h1>
        <table>
          <tbody>
            <tr>
              <td>CUSerId</td>
              <td>
                <input type="text" value={CUSerId} onChange={handleCUSerId} />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  type="password"
                  value={CUserPass}
                  onChange={handleCUserPass}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button onClick={handleLoginButton}>Login</button>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default CustomerLogin;
