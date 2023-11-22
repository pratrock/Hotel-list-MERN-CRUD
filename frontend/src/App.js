import React, { useEffect } from "react";
import { Link, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import HotelList from "./components/HotelList";
import AddHotel from "./components/AddHotel";
import EditHotel from "./components/EditHotel";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";
import "./App.css";
const App = () => {
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/loginUser");
  };

  const ProtectedRoute = ({ element }) => {
    return token ? element : <Navigate to="/loginUser" />;
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/addHotel" className="nav-link">
            Add Hotel
          </Link>
          {!token && (
            <>
              <Link to="/registerUser" className="nav-link">
                Register
              </Link>
            </>
          )}
          {token ? (
            <a href="#" onClick={handleLogout} className="nav-link">
              Logout
            </a>
          ) : (
            <Link to="/loginUser" className="nav-link">
              Log In
            </Link>
          )}
        </div>
      </nav>
      <div className="content-container">
        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute element={<HotelList />} />}
          />
          <Route
            path="/addHotel"
            element={<ProtectedRoute element={<AddHotel />} />}
          />
          <Route path="/editHotel/:id" element={<EditHotel />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/loginUser" element={<LoginUser />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
