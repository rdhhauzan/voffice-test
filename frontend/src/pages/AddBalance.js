import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AddBalance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    credit: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(id, Input);
    axiosApi
      .post(`/client/addBalance/${id}`, Input, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Balance Add Successfully!",
        });
        navigate("/");
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
      <h1>Add Balance</h1>
      <form method="post" onSubmit={handleSubmit}>
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
