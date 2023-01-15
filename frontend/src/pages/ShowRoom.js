import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";

export default function ShowRoom() {
  const [Room, setRoom] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function deleteRoom(id) {
    axiosApi
      .delete(`/room/delete/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Delete Success!",
        });
      });
  }

  function toAddRoom() {
    navigate("/room/add");
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
  }, []);

  if (isLoading) {
    return <MDSpinner />;
  }
  return (
    <>
      <Navbar />

      <a
        class="btn btn-primary mt-3"
        href="#"
        role="button"
        onClick={() => toAddRoom()}
      >
        Add Room
      </a>
      <h1>Room List</h1>

      <table class="table table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Room name</th>
            <th scope="col">Cost Per Hour</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {Room.map((el, idx) => {
          return (
            <tbody key={el.id}>
              <tr>
                <td>{idx + 1}</td>
                <td>{el?.roomName}</td>
                <td>{el?.costPerHour}</td>
                <td>
                  <a
                    class="btn btn-primary"
                    href="#"
                    role="button"
                    onClick={() => deleteRoom(el?.id)}
                  >
                    Edit Room
                  </a>
                  <a class="btn btn-danger mx-3" href="#" role="button">
                    Delete Room
                  </a>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </>
  );
}
