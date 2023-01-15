import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a
          class="navbar-brand"
          href="#"
          onClick={() => {
            navigate("/");
          }}
        >
          Navbar
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => {
                  navigate("/upload");
                }}
              >
                Upload CSV
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => {
                  navigate("/type");
                }}
              >
                Ticket Type List
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
