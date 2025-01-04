import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserSelection from "./components/userSelection";
import ExplorarEventos from "./components/explorar-eventos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userSelection" element={<UserSelection />} />
        <Route path="/explorar-eventos" element={<ExplorarEventos />} />
      </Routes>
    </Router>
  );
}

export default App;
