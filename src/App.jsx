import { Routes, Route } from "react-router-dom";
import LoginCard from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReservationSchedule from "./pages/ReservationSchedule";
import RoomsPage from "./pages/RoomsPage";



const App = () => (
  <Routes>
      <Route index element={<LoginCard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resevarsi" element={<ReservationSchedule />} />
      <Route path="/room" element={<RoomsPage />} />
      <Route path="/dashboard/documents" element={<Dashboard />} />
      <Route path="/dashboard/settings" element={<Dashboard />} />
  </Routes>
);

export default App;
