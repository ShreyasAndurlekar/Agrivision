import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from "./pages/Welcome";
import Disease from "./pages/Disease";
import Croppred from "./pages/Croppred";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Croppred" element={<Croppred />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;