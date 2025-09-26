import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeadMagnetPage from "./pages/LeadMagnetPage";
import BookLandingPage from "./pages/BookLandingPage";
import UpsellPage from "./pages/UpsellPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LeadMagnetPage />} />
            <Route path="/livre" element={<BookLandingPage />} />
            <Route path="/formation" element={<UpsellPage />} />
            <Route path="/connexion" element={<LoginPage />} />
            <Route path="/espace-membre" element={<DashboardPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;