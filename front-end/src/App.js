import logo from "./logo.svg";
import "./App.css";
import ApplicationRouter from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ApplicationRouter />
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        position="top-center"
      />
    </>
  );
}

export default App;
