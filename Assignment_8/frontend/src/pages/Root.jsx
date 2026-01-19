import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <header className="header">
        <nav className="container nav">
          <Link to="/">
            <h1>Todo</h1>
          </Link>
        </nav>
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Root;
