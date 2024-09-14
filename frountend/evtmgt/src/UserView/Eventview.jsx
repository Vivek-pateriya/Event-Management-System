import React, { useState, useEffect } from "react";
import axios from "axios";
function Eventview(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/event/show")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1>Event View</h1>
      <center>
        <h1>Notifications </h1>
      </center>
      <div className="vp-flexbox">
        {data.map((item) => (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Event {item.eventid}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {item.eventname}
              </h6>
              <p className="card-text">{item.eventdata}</p>
              <p className="card-text">{item.eventcity}</p>
              <p className="card-text">{item.eventstate}</p>
              <p className="card-text">{item.status ? "Enable" : "Disable"}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Eventview;
