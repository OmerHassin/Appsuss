const { Link } = ReactRouterDOM;

export function AppHeader() {
  return (
    <header className="app-header full main-layout">
      <h1>React Book Shop</h1>
      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/book">Books</Link>
        <Link to="/about">About</Link>
        <Link to="/book/add">Books From Google</Link>
      </nav>
    </header>
  );
}
