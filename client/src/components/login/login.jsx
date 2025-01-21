/* eslint-disable react/prop-types */
import { useState } from "react";
import "./auth.css";

const Login = ({setCurrentTab, setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { token } = data;
      localStorage.setItem("token", token);
      console.log("token desde login: ", token)
      setToken(token);      
      setCurrentTab('Home');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleGoToRegister = () => {
    setCurrentTab('Register');
  };

  return (
    <div className="register-wrapper">
      <form className="form" onSubmit={handleLogin}>
        <p className="titlel">Login</p>
        {error && <p className="error">{error}</p>}

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

        <button className="submit" type="submit">
          Login
        </button>

        <p className="signin">
          Don&apos;t have an account?{" "}
          <button className="link" type="button" onClick={handleGoToRegister}>
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;