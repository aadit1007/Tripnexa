import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import TripPlanner from "./pages/TripPlanner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
      </Routes>
    </Router>
  );
}

export default App;