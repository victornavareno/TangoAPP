import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserSelection from "./components/userSelection";
import Register from "./components/register";
import ExplorarEventos from "./components/explorar-eventos";
import HostDashboard from "./components/HostDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userSelection" element={<UserSelection />} />
        <Route path="/explorar-eventos" element={<ExplorarEventos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hostDashboard" element={<HostDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
