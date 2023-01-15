import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function AddClient() {
  const navigate = useNavigate();

  const [Input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    credit: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    axiosApi
      .post(`/client/add`, Input, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Client Add Successfully!",
        });
        navigate("/client");
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

  return (
    <>
      <Navbar />

      <h1>Add Client</h1>

      <form method="post" onSubmit={handleSubmit}>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="name"
            onChange={handleChange}
            value={Input.name}
          />
          <label for="floatingInput">Name</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            onChange={handleChange}
            value={Input.email}
          />
          <label for="floatingInput">Email</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="phone"
            onChange={handleChange}
            value={Input.phone}
          />
          <label for="floatingInput">Phone</label>
        </div>

        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="credit"
            onChange={handleChange}
            value={Input.credit}
          />
          <label for="floatingInput">Credit</label>
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
