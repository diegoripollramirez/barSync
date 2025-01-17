/* eslint-disable react/prop-types */
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = ({ setCurrentTab }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, firstname, lastname, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      const { token } = data;
      localStorage.setItem("token", token);      
      setCurrentTab('Home');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleGoToLogin = () => {
    setCurrentTab('Login');
  };

  return (
    <div className="register-wrapper">
      <form className="form" onSubmit={handleRegister}>
        <p className="titlel">Register</p>
        <p className="message">Signup now and get full access to our app.</p>
        {error && <p className="error">{error}</p>}

        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder=""
              required
            />
            <span>First Name</span>
          </label>
          <label>
            <input
              className="input"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder=""
              required
            />
            <span>Last Name</span>
          </label>
        </div>

        <label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
          />
          <span>Email</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            required
          />
          <span>Password</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=""
            required
          />
          <span>Confirm Password</span>
        </label>

        <button className="submit" type="submit">
          Register
        </button>

        <p className="signin">
          Already have an account?{" "}
          <button className="link" type="button" onClick={handleGoToLogin}>
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
