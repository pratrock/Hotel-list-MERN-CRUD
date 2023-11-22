import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterUser.css";

const RegisterUser = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
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
    if (!user.firstName)
      newErrors.firstName = "Come on, tell us your first name!";
    if (!user.lastName)
      newErrors.lastName = "Last name is a must-have, really.";
    if (!user.email) newErrors.email = "You forgot to tell us your email!";
    if (!user.password) newErrors.password = "Don't be shy, enter a password.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const apiUrl = "http://localhost:4000/registerUser";

    try {
      const register = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (register.ok) {
        const userData = await register.json();
        console.log("Success", userData);
        navigate("/loginUser");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <div className="register-container">
      <form>
        <div className="form-group">
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className={`input-field ${errors.firstName ? "jiggle" : ""}`}
              placeholder="Enter your First Name"
            />
            {errors.firstName && (
              <div className="error-message">{errors.firstName}</div>
            )}
          </label>
        </div>
        <div className="form-group">
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className={`input-field ${errors.lastName ? "jiggle" : ""}`}
              placeholder="Enter your Last Name"
            />
            {errors.lastName && (
              <div className="error-message">{errors.lastName}</div>
            )}
          </label>
        </div>
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
        <button onClick={handleClick} className="register-btn">
          Let's Do This!
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
