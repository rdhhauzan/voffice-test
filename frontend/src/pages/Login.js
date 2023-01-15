import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";

export default function Login() {
  const navigate = useNavigate();
  const [LoginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    axiosApi
      .post("/login", LoginForm)
      .then((data) => {
        localStorage.setItem("access_token", data.data.access_token);
        localStorage.setItem("id", data.data.id);
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
    setLoginForm({
      ...LoginForm,
      [name]: value,
    });
  }

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow rounded-3 my-5">
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form method="post" onSubmit={handleSubmit}>
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      onChange={handleChange}
                      value={LoginForm.email}
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      value={LoginForm.password}
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <div class="d-grid">
                    <button
                      class="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <a
                  class="btn btn-primary mt-3 d-flex justify-content-center"
                  href="#"
                  role="button"
                  onClick={() => navigate("/register")}
                >
                  Register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
