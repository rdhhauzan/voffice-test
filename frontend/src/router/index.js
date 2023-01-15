import { createBrowserRouter } from "react-router-dom";
import { redirect } from "react-router-dom";
import AddBalance from "../pages/AddBalance";
import AddRoom from "../pages/AddRoom";
import EditRoom from "../pages/EditRoom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ShowClient from "../pages/ShowClient";
import ShowRoom from "../pages/ShowRoom";
import ShowRoomUsage from "../pages/ShowRoomUsage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: async () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }
    // },
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/register",
    element: <Register />,
    loader: async () => {
      if (localStorage.getItem("access_token")) {
        return redirect("/");
      }
    },
  },
  {
    path: "/client",
    element: <ShowClient />,
    // loader: async () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }
    // },
  },
  {
    path: "/client/addBalance/:id",
    element: <AddBalance />,
    // loader: async () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }
    // },
  },

  {
    path: "/room",
    element: <ShowRoom />,
    // loader: async () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }
    // },
  },
  {
    path: "/room/add",
    element: <AddRoom />,
    // loader: async () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }
    // },
  },
  {
    path: "/room/edit/:id",
    element: <EditRoom />,
    // loader: async () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }
    // },
  },
  {
    path: "/RoomUsage",
    element: <ShowRoomUsage />,
    // loader: async () => {
    //   if (!localStorage.getItem("access_token")) {
    //     return redirect("/login");
    //   }
    // },
  },
]);

export default router;
