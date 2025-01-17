import { Link } from "react-router";
import barSyncLogo from "../../assets/barSync_logo.png";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="hero">
          <img src={barSyncLogo} className="logo"></img>
          <h1 className="title">barSync</h1>
        </div>
        <nav className="nav-buttons">
          <Link to={"/"} className="nav-button">
            <p>Home</p>
          </Link>
          <Link to={"/ingredientsearch"} className="nav-button">
            <p>Add Ingredient</p>
          </Link>
          <Link to={"/recipes"} className="nav-button">
            <p>Make something?</p>
          </Link>
          <Link to={"/login"} className="nav-button">
            <p>Login</p>
          </Link>
          <Link to={"/register"} className="nav-button">
            <p>Register</p>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
