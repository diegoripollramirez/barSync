import barSyncLogo from "../../assets/barSync_logo.png";

function Navbar({setCurrentTab}) {
  return (
    <>
      <div className="navbar">
        <div className="hero">
          <img src={barSyncLogo} className="logo"></img>
          <h1 className="title">barSync</h1>
        </div>
        <nav className="nav-buttons">
        <button className="nav-button" onClick={() => setCurrentTab('Home')}>
            <p>Home</p>
          </button>
          <button className="nav-button" onClick={() => setCurrentTab('IngredientSearch')} >
            <p>Add Ingredient</p>
          </button>
          <button className="nav-button" onClick={() => setCurrentTab('RecipeList')} >
            <p>Make something?</p>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
