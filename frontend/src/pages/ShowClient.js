import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../apis/axios";
import MDSpinner from "react-md-spinner";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function ShowClient() {
  const [Client, setClient] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function toAddBalance(id) {
    navigate(`addBalance/${id}`);
  }

  useEffect(() => {
    setIsLoading(true);
    axiosApi
      .get("/clients", {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      })
      .then((data) => {
        setClient(data.data);
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
      <h1 className="mt-3">Client List : </h1>
      <table class="table table-bordered table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Credit</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {Client.map((el, idx) => {
          return (
            <tbody key={el.id}>
              <tr>
                <td>{idx + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.credit}</td>
                <td>{el?.phone}</td>
                <td>
                  <a
                    class="btn btn-primary"
                    href="#"
                    role="button"
                    onClick={() => toAddBalance(el?.id)}
                  >
                    Add Credit
                  </a>
                  <a class="btn btn-primary mx-3" href="#" role="button">
                    Show Detail
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
