import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function AddRoomUsage() {
  const [Input, setInput] = useState({
    startTime: "",
    endTime: "",
    quotaUsed: "",
    id: "",
    roomId: "",
  });
  return (
    <>
      <Navbar />
      <h1>Add Room Usage</h1>
    </>
  );
}
