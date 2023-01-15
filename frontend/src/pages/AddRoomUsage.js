import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function AddRoomUsage() {
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    startTime: "",
    endTime: "",
    quotaUsed: "",
    id: "",
    roomId: "",
  });
  const [Client, setClient] = useState([]);
  const [Room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    axiosApi
      .post(`/roomUsage/add`, Input, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Room Usage Add Successfully!",
        });
        navigate("/RoomUsage");
      })
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          icon: "error",
          text: err.response.data,
        });
      });
  }

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    setInput({
      ...Input,
      [name]: value,
    });
  }

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get("/rooms", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        setRoom(data.data);
        console.log(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setIsLoading(true);
    axiosApi
      .get("/clients", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        setClient(data.data);
        console.log(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <MDSpinner />;
  }
  return (
    <>
      <Navbar />
      <h1>Add Room Usage</h1>

      <form method="post" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Room</label>
          <select
            name="roomId"
            onChange={handleChange}
            value={Input.roomId}
            className="form-select"
          >
            <option default disabled value="">
              --- Select One ---
            </option>
            {Room.map((el, idx) => {
              return (
                <option key={idx} value={el.id}>
                  {el.roomName}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Client</label>
          <select
            name="id"
            onChange={handleChange}
            value={Input.id}
            className="form-select"
          >
            <option default disabled value="">
              --- Select One ---
            </option>
            {Client.map((el, idx) => {
              return (
                <option key={idx} value={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="startTime"
            onChange={handleChange}
            value={Input.startTime}
          />
          <label for="floatingInput">Start Time</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="endTime"
            onChange={handleChange}
            value={Input.endTime}
          />
          <label for="floatingInput">End Time</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="quotaUsed"
            onChange={handleChange}
            value={Input.quotaUsed}
          />
          <label for="floatingInput">Quota Used</label>
        </div>

        <button
          class="btn btn-primary btn-login text-uppercase fw-bold"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
}
