import React, { useEffect, useState } from "react";
import axios from "axios";
function EvtMgt() {
  //to add event remove event and update event
  const [eventid, setEventId] = useState("");
  const [eventname, setEventName] = useState("");
  const [eventdata, setEventData] = useState("");
  const [eventcity, setEventCity] = useState("");
  const [eventstate, setEventState] = useState("");
  const [status, setStatus] = useState("");
  const [stList, setStList] = useState([]);
  const [ctList, setCtList] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5050/event/getall")
      .then((res) => {
        if (res.data.length > 0) {
          setEventId(res.data[res.data.length - 1].eventid + 1);
        } else {
          setEventId(1);
        }
      })
      .catch((err) => {
        alert(err.message);
      });

    axios.get("http://localhost:5050/state/show").then((res) => {
      setStList(res.data);
    });
  }, []);
  const handleEventId = (evt) => {
    setEventId(evt.target.value);
  };
  const handleEventName = (evt) => {
    setEventName(evt.target.value);
  };

  const handleEventData = (evt) => {
    setEventData(evt.target.value);
  };

  const handleStIdSelect = (evt) => {
    setEventState(evt.target.value);
    axios
      .get("http://localhost:5050/city/showcitybystate/" + evt.target.value)
      .then((res) => {
        setCtList(res.data);
      });
  };
  const handleCtIdSelect = (evt) => {
    setEventCity(evt.target.value);
  };

  const handlestatus = (evt) => {
    setStatus(evt.target.value);
  };
  const handleAddButton = () => {
    var obj = {
      eventid: eventid,
      eventname: eventname,
      eventdata: eventdata,
      eventcity: eventcity,
      eventstate: eventstate,
      status: status,
    };

    axios
      .post("http://localhost:5050/event/save", obj)
      .then((res) => {
        alert(res.data, "Data saved successfully");
        setEventId(eventid + 1);
        setEventName("");
        setEventData("");
        setEventCity("");
        setEventState("");
        setStatus("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleShowButton = () => {
    axios
      .get("http://localhost:5050/event/getall")
      .then((res) => {
        setEventList(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleSearchButton = () => {
    if (eventid != undefined && eventid != "") {
      axios
        .get("http://localhost:5050/event/search/" + eventid)
        .then((res) => {
          if (res.data.stid != undefined) {
            setEventId(res.data.eventid);
            setEventName(res.data.eventname);
            setEventData(res.data.eventdata);
            setEventCity(res.data.eventcity);
            setEventState(res.data.eventstate);
            setStatus(res.data.status);
          } else {
            alert("No data found");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    if (eventname !== undefined && eventname != "") {
      axios
        .get("http://localhost:5050/event/searchbyname/" + eventname)
        .then((res) => {
          if (res.data.stid != undefined) {
            setEventId(res.data.eventid);
            setEventName(res.data.eventname);
            setEventData(res.data.eventdata);
            setEventCity(res.data.eventcity);
            setEventState(res.data.eventstate);
            setStatus(res.data.status);
          } else {
            alert("No data found");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const handleUpdateButton = () => {
    var obj = {
      eventid: eventid,
      eventname: eventname,
      eventdata: eventdata,
      eventcity: eventcity,
      eventstate: eventstate,
      status: status,
    };

    axios
      .put("http://localhost:5050/event/update/", obj)
      .then((res) => {
        alert(res.data);
        setEventId("");
        setEventName("");
        setEventData("");
        setEventCity("");
        setEventState("");
        setStatus("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleDeleteButton = () => {
    if (eventid !== undefined && eventid != "") {
      axios
        .delete("http://localhost:5050/event/delete/" + eventid)
        .then((res) => {
          alert(res.data);
          setEventId("");
          setEventName("");
          setEventData("");
          setEventCity("");
          setEventState("");
          setStatus("");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };
  const handletoggleButton = (Uid, currentStatus) => {
    const updatedStatus = currentStatus === "active" ? "deactive" : "active";
    const obj2 = { Uid, status: updatedStatus };

    axios
      .put("http://localhost:9679/customer/toggle", obj2)
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
      <h1>Event Management</h1>
      <center>
        <table>
          <tr>
            <td>Event Id</td>
            <td>
              <input type="number" value={eventid} onChange={handleEventId} />
            </td>
          </tr>
          <tr>
            <td>Event Name</td>
            <td>
              <input type="text" value={eventname} onChange={handleEventName} />
            </td>
          </tr>

          <tr>
            <td>Event Date</td>
            <td>
              <input type="date" value={eventdata} onChange={handleEventData} />
            </td>
          </tr>
          <tr>
            <td>State</td>
            <td>
              <select value={eventstate} onChange={handleStIdSelect}>
                <option value="">Select State</option>
                {stList.map((state, index) => (
                  <option key={index} value={state.stid}>
                    {state.stname}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>City</td>
            <td>
              <select
                value={eventcity}
                onChange={handleCtIdSelect}
                disabled={!eventstate}
              >
                <option value="">Select City</option>
                {ctList.map((city, index) => (
                  <option key={index} value={city.ctid}>
                    {city.ctname}
                  </option>
                ))}
              </select>
            </td>
          </tr>

          <tr>
            <td>Status</td>
            <td>
              <input type="number" value={status} onChange={handlestatus} />
            </td>
          </tr>

          <tr>
            <td>
              <input type="button" value="Add" onClick={handleAddButton} />
            </td>
            <td>
              <input type="button" value="Show" onClick={handleShowButton} />
            </td>
            <td>
              <input
                type="button"
                value="Search"
                onClick={handleSearchButton}
              />
            </td>
            <td>
              <input
                type="button"
                value="Update"
                onClick={handleUpdateButton}
              />
            </td>
          </tr>

          <tr>
            <td>
              <input
                type="button"
                value="Delete"
                onClick={handleDeleteButton}
              />
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Event Id</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>State</th>
            <th>City</th>
            <th>Status</th>
          </tr>

          {eventList.map((item) => (
            <tr>
              <td>{item.eventid}</td>
              <td>{item.eventname}</td>
              <td>{item.eventdata}</td>
              <td>{item.eventstate}</td>
              <td>{item.eventcity}</td>
              <td>{item.status}</td>
              <td>
                <input
                  type="button"
                  value={item.status ? "Disable" : "Enable"}
                  onClick={() => handletoggleButton(item.eventid, item.status)}
                />
              </td>
            </tr>
          ))}
        </table>
      </center>
    </>
  );
}

export default EvtMgt;
