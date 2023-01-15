// import logo from './logo.svg';
// import './App.css';
import router from "./router";
import { RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
