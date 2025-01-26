import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Disease from "./pages/Disease";
import Croppred from "./pages/Croppred"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/disease" element={<Disease />} />
        <Route path="/Croppred" element={<Croppred />} />
      </Routes>
    </Router>
  );
};

export default App;
