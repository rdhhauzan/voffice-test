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

  function convertDate(date) {
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(date);
  }

  function deleteRoomUsage(roomId, clientId) {
    console.log(roomId, clientId);
    axiosApi
      .delete(`/roomUsage/delete/${roomId}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          clientId: clientId,
        },
      })
      .then(() => {
        Swal.fire({
          title: "Success!",
          icon: "success",
          text: "Delete Success!",
        });

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
      });
  }

  if (isLoading) {
    return <MDSpinner />;
  }
  return (
    <>
      <Navbar />
      {console.log(Data)}
      <a
        class="btn btn-primary mt-3"
        href="#"
        role="button"
        onClick={() => navigate("/RoomUsage/add")}
      >
        Add Room Usage
      </a>
      <h1>Room Usage : </h1>

      <table class="table table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Room name</th>
            <th scope="col">Client name</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Time</th>
            <th scope="col">Quota Used</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {Data.map((el, idx) => {
          return (
            <tbody key={el.id}>
              <tr>
                <td>{idx + 1}</td>
                <td>{el?.Room?.roomName}</td>
                <td>{el?.Client?.name}</td>
                <td>{convertDate(el?.bookingTime)}</td>
                <td>
                  {el?.startTime} - {el?.endTime}
                </td>
                <td>{el?.quotaUsed}</td>
                <td>
                  <a
                    class="btn btn-danger"
                    href="#"
                    role="button"
                    onClick={() => deleteRoomUsage(el?.roomId, el?.clientId)}
                  >
                    Delete Room Usage
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
