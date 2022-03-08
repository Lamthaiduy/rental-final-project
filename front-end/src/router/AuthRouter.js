import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import roles from "../constants/roles";
import Container from "../containers/AppContainer";

function AuthorizeRouter({ authReducer, children }) {
  const { isAuth, user } = authReducer;
  return isAuth ? (
    user.role ? (
      user.status !== "approved" ? (
        <Navigate to={`/status/${user.status}`} />
      ) : (
        <Container>{children}</Container>
      )
    ) : (
      <Navigate to="/select-role" />
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

export default connect(mapStateToProps)(AuthorizeRouter);
