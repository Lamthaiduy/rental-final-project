import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import roles from "../constants/roles";
import Container from "../containers/AppContainer";

function UnauthorizeRouter({ authReducer, children }) {
  const { isAuth, user } = authReducer;
  return !isAuth ? <Container>{children}</Container> : (user.role === roles.ADMIN ? <Navigate to="/dashboard" /> : <Navigate to="/home" />);
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(UnauthorizeRouter);
