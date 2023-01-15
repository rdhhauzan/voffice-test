import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    roomName: "",
    costPerHour: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    axiosApi
      .put(`/room/edit/${id}`, Input, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Edit Add Successfully!",
        });
        navigate("/room");
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
    axiosApi
      .get(`/room/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        setInput(data.data);
      });
    console.log(Input);
  }, [id]);
  return (
    <>
      <Navbar />

      <h1>Edit Room</h1>

      <form method="post" onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="roomName"
            onChange={handleChange}
            value={Input.roomName}
          />
          <label for="floatingInput">Room Name</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="costPerHour"
            onChange={handleChange}
            value={Input.costPerHour}
          />
          <label for="floatingInput">Cost / Hour</label>
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
