import logo from './logo.svg';
import './App.css';
import ApplicationRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ApplicationRouter />
    <ToastContainer autoClose={true} position="top-center" />
    </>
  );
}

export default App;
