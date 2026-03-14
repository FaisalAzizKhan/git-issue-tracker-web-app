import { Route, Routes } from "react-router-dom";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import MainLayout from "../../../Layout/MainLayout/MainLayout";  
import { Issue } from "../../../Pages/Issue/Issue";
import { SingleIssue } from "../../../Pages/Issue/SingleIssue";
import { CreateNewIssue } from "../../../Pages/Issue/CreateNewIssue";

export const UserRoutes = () => {
  const routes = [
    { path: "dashboard", element: <Dashboard />, title: "Dashboard" },
    { path: "issues", element: <Issue />, title: "Issue" },
    { path: "issues/:issue_id", element: <SingleIssue />, title: "Issue" },
    { path: "issues/create", element: <CreateNewIssue />, title: "Issue" },
  ];

 return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
           element={<MainLayout pageTitle={route.title}>{route.element}</MainLayout>}
        />
      ))}
    </Routes>
  );
};



