import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import UserSelection from "./pages/UserSelection";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EventsExplorer from "./pages/EventsExplorer";
import HostDashboard from "./pages/HostDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/userSelection" element={<UserSelection />} />
        <Route path="/explorar-eventos" element={<EventsExplorer />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hostDashboard" element={<HostDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
