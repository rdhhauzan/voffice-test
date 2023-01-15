import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Home</h1>
      </div>
    </>
  );
}
