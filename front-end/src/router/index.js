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
import Category from "../pages/category";
import CreatePost from "../pages/createPost";
import ProfilePage from "../pages/profile";
import OwnerList from "../pages/ownerList";
import EditPost from "../pages/editPost";
import WaitingPost from "../pages/waitingPost";
import { connect } from "react-redux";
import roles from "../constants/roles";
import NotFound from "../pages/404";
import DepositForm from "../pages/depositForm";
import Success from "../pages/sucess";
import DepositHistory from "../pages/deposit-history";
import RefundRequest from "../pages/refund-request";
import TransactionHistory from "../pages/transaction-history";

function ApplicationRouter({authReducer}) {
  const {user} = authReducer;
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
        {user.role === roles.ADMIN && <>
          <Route
          path="/dashboard"
          element={
            <AdminProtectedRouter>
              <Admin />
            </AdminProtectedRouter>
          }
        />
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
            path="/dashboard/categories"
            element={
              <AdminProtectedRouter>
                <Category />
              </AdminProtectedRouter>
            }
          />
           <Route
            path="/dashboard/waiting"
            element={
              <AdminProtectedRouter>
                <WaitingPost />
              </AdminProtectedRouter>
            }
          />
           <Route
            path="/dashboard/deposit"
            element={
              <AdminProtectedRouter>
                <RefundRequest />
              </AdminProtectedRouter>
            }
          />
        </>}
        {user.role === roles.USER && <>
          <Route
          path="/home"
          element={
            <AuthRouter>
              <Home />
            </AuthRouter>
          }
        />
          <Route
          path="/deposit/:postId"
          element={
            <AuthRouter>
              <DepositForm />
            </AuthRouter>
          }
        />
          <Route
          path="/deposit-history"
          element={
            <AuthRouter>
              <DepositHistory />
            </AuthRouter>
          }
        />
          <Route
          path="/vnp_return"
          element={
            <AuthRouter>
              <Success />
            </AuthRouter>
          }
        />
        </>}
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
        <Route
          path="/profile"
          element={
            <AuthRouter>
              <ProfilePage />
            </AuthRouter>
          }
        />
        {user.role === roles.SELLER && <>
          <Route
          path="/create"
          element={
            <AuthRouter>
              <CreatePost />
            </AuthRouter>
          }
        />
        <Route
          path="/home"
          element={
            <AuthRouter>
              <OwnerList />
            </AuthRouter>
          }
        />
        <Route
          path="/transaction-history"
          element={
            <AuthRouter>
              <TransactionHistory />
            </AuthRouter>
          }
        />
        <Route
          path="/edit/:postId"
          element={
            <AuthRouter>
              <EditPost />
            </AuthRouter>
          }
        /></>}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer
  }
}

export default connect(mapStateToProps)(ApplicationRouter) 