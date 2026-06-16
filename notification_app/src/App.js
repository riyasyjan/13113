import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import NotificationsPage from "./pages/NotificationsPage";
import PriorityPage from "./pages/PriorityPage";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px" }}>
        <Link to="/">All Notifications</Link>
        {" | "}
        <Link to="/priority">Priority Notifications</Link>
      </nav>

      <Routes>
        <Route path="/" element={<NotificationsPage />} />

        <Route path="/priority" element={<PriorityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
