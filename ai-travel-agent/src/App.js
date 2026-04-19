import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Landing from "./pages/Landing";
import TripPlanner from "./pages/TripPlanner";
import TripResult from "./pages/TripResult";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/trip-result" element={<TripResult />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;