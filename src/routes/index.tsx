import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PhysicalPerson } from "../page/physical-person";
import { PhysicalRersonReport } from "../page/physical-person-report";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PhysicalPerson />,
    },
    {
      path: "/physical-person-report",
      element: <PhysicalRersonReport />,
    },
  ]);

    return <RouterProvider router={router} />;
};
