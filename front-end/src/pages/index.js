import { connect } from "react-redux"
import roles from "../constants/roles";
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

function Default({authReducer}) {


    const {isAuth, user} = authReducer;
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuth && user.role === roles.ADMIN) {
            navigate('/dashboard');
        }
    }, [isAuth, user])

    return(
        <div className="bg-gray-100 py-20">
                <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                    <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-gray-800 font-black leading-7 md:leading-10">
                            Find and Rent 
                            <span className="text-indigo-700"> House </span>
                            You Want
                        </h1>
                        <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">A professonal website drives sales. Create a beautiful website to impress and engage new customers and establish your business online </p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={() => navigate('/home')} className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm">Get Started</button>
                    </div>
                </div>
            </div>
        
    )
}

const mapStateToProps = (state) => {
    return {
      authReducer: state.authReducer,
    };
  };

export default connect(mapStateToProps)(Default);