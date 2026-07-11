import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import MemberLayout from "../layouts/MemberLayout";
import ManagerLayout from "../layouts/ManagerLayout";

import MemberDashboard from "../pages/member/MemberDashboard";
import MyReports from "../pages/member/MyReports";
import CreateReport from "../pages/member/CreateReport";
import EditReport from "../pages/member/EditReport";

import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ViewReport from "../pages/manager/ViewReport";
import Projects from "../pages/manager/Projects";
import ProtectedRoute from "./ProtectedRoute";


function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* Member Routes */}
      <Route path="/member" element={<ProtectedRoute role = "MEMBER"><MemberLayout/></ProtectedRoute>}>
        <Route index element={<MemberDashboard />} />
        <Route path="reports" element={<MyReports />} />
        <Route path="reports/new" element={<CreateReport />} />
        <Route path="reports/:id/edit" element={<EditReport />} />
      </Route>


      {/* Manager Routes */}
      <Route path="/manager" element={<ProtectedRoute role = "MANAGER"><ManagerLayout/></ProtectedRoute>}>
        <Route index element={<ManagerDashboard />} />
        <Route path="reports/:id"element={<ViewReport />}/>
        <Route path="projects"element={<Projects />}/>
      </Route>
      


      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default AppRoutes;