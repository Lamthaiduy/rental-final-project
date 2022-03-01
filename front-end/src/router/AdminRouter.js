import AdminContainer from "../containers/AdminContainer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import roles from "../constants/roles";

function AdminProtectedRouter({ authReducer, children }) {
  const { user, isAuth } = authReducer;
  return isAuth ? (
    user.role !== roles.ADMIN ? (
      <Navigate to="/404" />
    ) : (
      <AdminContainer>{children}</AdminContainer>
    )
  ) : (
    <Navigate to="/login" />
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(AdminProtectedRouter);
