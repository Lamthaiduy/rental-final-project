import { useState } from "react";
import roles from "../constants/roles";
import { selectRole } from "../apis";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { updateProfile } from "../reducers/action/authAction";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
function AccountStatus ({ authReducer, updateAccount }) {
  const { status } = useParams();

  console.log(status)
  return (
    <div className="w-4/5 mx-auto mt-10 mb-60">
      {status === "pending" ? (
        <>
          <h1 className="text-4xl font-black mb-5 text-center">
            Account Pending
          </h1>
          <div className="w-max flex items-center px-10 py-5 bg-gray-200 rounded-xl gap-5 mx-auto my-20">
            <CheckCircleIcon className="h-10 w-10 text-green-500" />
            <span className="font-medium">
              Thanks for using our platform, your account is in process, please
              wait until we can verify your information
            </span>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-black mb-5 text-center">
            Account Rejected
          </h1>
          <div className="w-max flex items-center px-10 py-5 bg-gray-200 rounded-xl gap-5 mx-auto my-20">
            <XCircleIcon className="h-10 w-10 text-red-500" />
            <span className="font-medium">
              Thanks for using our platform, your account had been declined by some reason.
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAccount: (data) => dispatch(updateProfile(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountStatus);
