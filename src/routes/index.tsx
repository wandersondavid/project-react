import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../page/home";
import { PhysicalPerson } from "../page/physical-person";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/physical-person",
      element: <PhysicalPerson />,
    },
    {
      path: "/physical-person/:id",
      element: <PhysicalPerson />,
    },
  ]);

    return <RouterProvider router={router} />;
};
