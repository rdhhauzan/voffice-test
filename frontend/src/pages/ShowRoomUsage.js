import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";

export default function ShowRoomUsage() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get("/roomUsages", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        setData(data.data);
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
      {console.log(Data)}
      <h1>Room Usage : </h1>
    </>
  );
}
