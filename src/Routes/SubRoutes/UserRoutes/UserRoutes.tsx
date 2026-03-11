import { Route, Routes } from "react-router-dom";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import MainLayout from "../../../Layout/MainLayout/MainLayout"; // adjust the path if needed

export const UserRoutes = () => {
  const routes = [
    { path: "dashboard", element: <Dashboard />, title: "Dashboard"  },

    // Add more pages here as needed
  ];

 return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          // element={<MainLayout>{route.element}</MainLayout>}
           element={<MainLayout pageTitle={route.title}>{route.element}</MainLayout>}
        />
      ))}
    </Routes>
  );
};



