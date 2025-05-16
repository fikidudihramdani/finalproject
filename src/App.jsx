import { Routes, Route } from "react-router-dom";
import LoginCard from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReservationSchedule from "./pages/ReservationSchedule";



const App = () => (
  <Routes>
   <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/resevarsi" element={<ReservationSchedule />} />
    <Route path="/dashboard/reports" element={<Dashboard />} />
    <Route path="/dashboard/documents" element={<Dashboard />} />
    <Route path="/dashboard/settings" element={<Dashboard />} />
  </Routes>
);

export default App;
