import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationContainer from "../containers/AppContainer";
import Default from "../pages";
import Admin from "../pages/admin";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import AdminProtectedRouter from "./AdminRouter";
import UnauthRouter from "./UnauthRouter";
import AuthRouter from "./AuthRouter";
import Users from "../pages/users";
import Sellers from "../pages/sellers";
import RoleSelection from "../pages/roleSelect";
import AccountStatus from "../pages/accountStatus";

export default function ApplicationRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ApplicationContainer>
              <Default />
            </ApplicationContainer>
          }
        />
        <Route
          path="/select-role"
          element={
            <ApplicationContainer>
              <RoleSelection />
            </ApplicationContainer>
          }
        />
        <Route
          path="/status/:status"
          element={
            <ApplicationContainer>
              <AccountStatus />
            </ApplicationContainer>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminProtectedRouter>
              <Admin />
            </AdminProtectedRouter>
          }
        >
        </Route>
        <Route
            path="/dashboard/users"
            element={
              <AdminProtectedRouter>
                <Users />
              </AdminProtectedRouter>
            }
          />
           <Route
            path="/dashboard/sellers"
            element={
              <AdminProtectedRouter>
                <Sellers />
              </AdminProtectedRouter>
            }
          />
        <Route
          path="/home"
          element={
            <AuthRouter>
              <Home />
            </AuthRouter>
          }
        />
        <Route
          path="/login"
          element={
            <UnauthRouter>
              <Login />
            </UnauthRouter>
          }
        />
        <Route
          path="/register"
          element={
            <UnauthRouter>
              <Register />
            </UnauthRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
