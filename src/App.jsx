import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserSelection from "./components/userSelection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userSelection" element={<UserSelection />} />
      </Routes>
    </Router>
  );
}

export default App;
