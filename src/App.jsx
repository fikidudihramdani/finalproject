import { Routes, Route } from "react-router-dom";
import LoginCard from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReservationSchedule from "./pages/ReservationSchedule";
import RoomsPage from "./pages/RoomsPage";
import ReportTable from "./pages/Report";
import ProfileSettings from "./pages/ProfileSettings";



const App = () => (
  <Routes>
      <Route index element={<LoginCard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resevarsi" element={<ReservationSchedule />} />
      <Route path="/room" element={<RoomsPage />} />
      <Route path="/report" element={<ReportTable />} />
      <Route path="/profile" element={<ProfileSettings />} />
  </Routes>
);

export default App;
