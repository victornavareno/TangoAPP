import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetail from "./pages/EventDetail.jsx";
import UserSelection from "./pages/UserSelection";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EventsExplorer from "./pages/EventsExplorer";
import HostDashboard from "./pages/HostDashboard";
import HeroKeda from "./pages/HeroKeda.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroKeda />} />
        <Route path="/userSelection" element={<UserSelection />} />
        <Route path="/explorar-eventos" element={<EventsExplorer />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
          <Route path="/hostDashboard" element={<HostDashboard />} />
          <Route path="/event/:id" element={<EventDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
