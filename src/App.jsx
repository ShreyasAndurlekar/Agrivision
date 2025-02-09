import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Welcome from "./pages/Welcome";
import Disease from "./pages/Disease";
import Croppred from "./pages/Croppred";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Weather from "./pages/Weather"
import Contact from "./pages/Contact";
import { NavBar } from "./pages/Navbar"
import GTranslate from "./GTranslate";
import ChatbotPopup from "./pages/ChatbotPopup";
import Test from "./pages/Test";


import Market from "./pages/Market";

const App = () => {
  return (
    <Router>
      <GTranslate />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/Croppred" element={<Croppred />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/NavBar" element={<NavBar />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Chatbotpopup" element={<ChatbotPopup />} />


        <Route path="/Market" element={<Market />} />

        <Route path="/test" element={<Test />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;