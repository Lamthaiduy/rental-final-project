import { useState } from "react";
import roles from "../constants/roles";
import {selectRole} from '../apis'
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../reducers/action/authAction";
const RoleSelection = ({authReducer, updateAccount}) => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const setUser = (e) => {
      setRole(roles.USER)
  }
  const setSeller = (e) => {
      setRole(roles.SELLER)
  }

  const handleSetRole = async(e) => {
    const {data, status} = await selectRole(authReducer.token, role);
    if(status === 201) {
        updateAccount({role: role});
        if(authReducer.user.status === 'approved') {
            navigate('/')
        }
        else {
            navigate(`/status/${authReducer.user.status}`)
        }
    }
  }

  return (
    <div className="w-4/5 mx-auto mt-10 mb-40">
      <h1 className="text-4xl font-black mb-5">What do you want here?</h1>
      <div className="w-full flex justify-between mt-20 items-center">
        <div onClick={setUser} className={`w-max border-2 ${role === roles.USER ? "border-green-500" : ""} hover:border-green-500 cursor-pointer rounded-xl px-10 py-5`}>
          <h4 className="text-center font-bold text-2xl">User</h4>
          <span className="font-medium">
            I'm here to looking for my best-fit house
          </span>
        </div>
        <div onClick={setSeller} className={`w-max border-2 ${role === roles.SELLER ? "border-green-500": ""} hover:border-green-500 cursor-pointer rounded-xl px-10 py-5`}>
          <h4 className="text-center  font-bold text-2xl">Seller</h4>
          <span className="font-medium">
            I'm here to lookfing for someone who want to rent my
            home/building/apartment
          </span>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button onClick={handleSetRole} disabled={role === null} className={`${role === null ? "cursor-not-allowed" : "cursor-pointer"} w-fit px-10 py-3 rounded-xl mt-20 bg-blue-500 text-white hover:bg-blue-700`}>
          Next
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      authReducer: state.authReducer,
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        updateAccount: (data) => dispatch(updateProfile(data))
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(RoleSelection);
