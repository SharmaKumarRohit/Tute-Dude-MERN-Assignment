import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Error from "./pages/Error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="*" element={<Error />} />
    </Route>,
  ),
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
