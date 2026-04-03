import { useContext } from "react";
import { DataContext } from "../DataProcessing/DataProcessing";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Page/Dashboard";
import { Toaster } from "react-hot-toast";
import Login from "../UserAuth/Login";
import PasswordChange from "../UserAuth/PasswordChange";
import Pages from "../Page/Pages";
import Loading from "./Loading";
import MainLayout from "./MainLayout";
import PageSettings from "../Page/PageSettings";
import Roles from "../Page/Roles";
import RoleSettings from "../Page/RoleSettings";
import UserSettings from "../Page/UserSettings";
import Users from "../Page/Users";
import PermissionRoute from "./PermissionRoute";
import Backup from "../Page/Backup";

export default function MainRouters() {
  const { loading } = useContext(DataContext);

  // ⛔ BLOCK rendering until auth is hydrated
  if (loading) return <Loading />;

  return (
    <>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#59B259",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#EC4034",
              color: "#fff",
            },
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password-change" element={<PasswordChange />} />

        <Route element={<PrivateRoute />}>
          <Route element={<PermissionRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/pages" element={<Pages />} />
              <Route path="/page-settings" element={<PageSettings />} />
              <Route path="/page-settings/:id" element={<PageSettings />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/role-settings" element={<RoleSettings />} />
              <Route path="/role-settings/:id" element={<RoleSettings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/user-settings" element={<UserSettings />} />
              <Route path="/user-settings/:id" element={<UserSettings />} />
              <Route path="/backup" element={<Backup />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}
