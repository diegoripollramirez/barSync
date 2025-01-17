/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");

    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h2>You have been logged out successfully</h2>
    </div>
  );
};

export default Logout;
