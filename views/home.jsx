const { Link } = ReactRouterDOM;

export function Home() {
  return (
    <section className="home">
      <h1>Welcome to Appsus!</h1>
      <p>Appsus is a versatile application that brings together various productivity tools in one place.</p>

      <div className="features">
        <Link to="/note">
          <div className="feature">
              <img src="./assets/img/keep.svg" alt="Google Keep Clone" className="feature-image" />
            <h2>Google Keep Clone</h2>
            <p>
              Stay organized with our Google Keep clone, a note-taking app that allows you to create, organize, and manage your notes
              seamlessly.
            </p>
          </div>
        </Link>

        <Link to="/mail">
          <div className="feature">
            <img src="./assets/img/gmail.svg" alt="Gmail Clone" className="feature-image" />
            <h2>Gmail Clone</h2>
            <p>
              Manage your emails efficiently with our Gmail clone, providing a familiar and intuitive interface for effective communication.
            </p>
          </div>
        </Link>
          </div>
    </section>
  );
}
