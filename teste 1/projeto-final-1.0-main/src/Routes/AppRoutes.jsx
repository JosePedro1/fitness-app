import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home/Home";
import TaskPage from "../pages/Task/TaskPage";
import RoutinePage from "../pages/Routine/RoutinePage";
import ProgressPage from "../pages/Progress/ProgressPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/routines" element={<RoutinePage />} /> 
        <Route path="/progress" element={<ProgressPage/>} />
      </Route>

      <Route path="*" element={<NotFoundRedirect />} />
    </Routes>
  );
};

const NotFoundRedirect = () => {
  React.useEffect(() => {
    window.location.href = "http://localhost:4200/login";
  }, []);

  return null;
};

export default AppRoutes;
