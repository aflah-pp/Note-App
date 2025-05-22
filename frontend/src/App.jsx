import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./pages/Page404";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {
  const Logout = () => {
    localStorage.clear();
    return <Navigate to="/login" />;
  };

  const RegisterAndLogout = () => {
    localStorage.clear();
    return <Register/>;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
