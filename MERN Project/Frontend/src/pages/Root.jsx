import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <>
      <header className="py-6">
        <div className="max-w-7xl px-4 mx-auto">
          <Link to="/">
            <h1 className="text-2xl font-bold text-neutral-800">
              Workout Budyyy
            </h1>
          </Link>
        </div>
      </header>
      <main className="bg-neutral-100 text-neutral-800 min-h-[calc(100dvh-79.99px)] py-8">
        <div className="max-w-7xl px-4 mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Root;
