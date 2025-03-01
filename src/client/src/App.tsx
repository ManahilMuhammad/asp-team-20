import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import AuthPage from "./pages/Auth";
import ProtectedRoute from "./components/protected-route";

import NotFoundPage from "./pages/404";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProtectedRoute children={<ProfilePage />} />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* 404 Error page when navigating to an unknown page */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App
