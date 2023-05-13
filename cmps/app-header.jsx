const { Link, NavLink } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header">
      <Link to="/">
        <h3 className="logo">
          Appsus <i className="fa-brands fa-react"></i>
        </h3>
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/mail">Mail</NavLink>
        <NavLink to="/book">Book</NavLink>
        <NavLink to="/note">Note</NavLink>
      </nav>
    </header>
  );
}
