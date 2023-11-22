// LoginUser.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginUser.css";

const LoginUser = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!user.email) newErrors.email = "You forgot to tell us your email!";
    if (!user.password) newErrors.password = "Don't be shy, enter a password.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const apiUrl = "http://localhost:4000/loginUser";

    try {
      const login = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (login.ok) {
        const userData = await login.json();
        console.log("Success", userData);
        localStorage.setItem("token", userData.token);
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login", error);

      // Check if the error response has a JSON format
      try {
        const errorData = await error.json();
        if (errorData.message) {
          setErrors({ backend: errorData.message });
        }
      } catch (jsonError) {
        console.error("Non-JSON error response", jsonError);
      }
    }
  };

  return (
    <div className="login-container">
      {errors.backend && <div className="error-message">{errors.backend}</div>}
      <form>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? "jiggle" : ""}`}
              placeholder="Enter your Email Address"
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? "jiggle" : ""}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </label>
        </div>
        <button onClick={handleClick} className="login-btn">
          Let's Go!
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
