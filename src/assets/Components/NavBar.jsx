import './Style/navbar.css';

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-logo">
          <h2>KaryaMitra</h2>
        </div>

        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/tasks">Tasks</a>
          <a href="/completed">Completed</a>
        </div>

        

      </div>
    </nav>
  );
};
