import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../reducers/action/authAction";
import avatar from "../assets/avatar.png";
import roles from "../constants/roles";
import { getUserNotifications, markNotificationAdRead } from "../apis/";
import { useCallback, useEffect, useState } from "react";
import {
  BellIcon,
  BookmarkIcon as SolidBookmark,
} from "@heroicons/react/solid";
import {
  BookmarkIcon as OutLineBookmark,
  ReceiptRefundIcon,
  ChatIcon
} from "@heroicons/react/outline";

function Header(props) {
  const { authReducer, logout } = props;
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [toggleNoti, setToggleNoti] = useState(false);
  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/login");
  }

  const handleToggleNotification = () => {
    setToggleNoti((prev) => !prev);
  };

  const loadNotification = useCallback(async () => {
    const { data, status } = await getUserNotifications(authReducer.token);
    if(status === 401) {
      logout()
    }
    setNotifications(data.data);
  }, [authReducer.token]);

  const markAsRead = async (id) => {
    await markNotificationAdRead(authReducer.token, id);
    loadNotification();
  };

  useEffect(() => {
    let interval;
    if (authReducer.isAuth && authReducer.user.role === roles.SELLER) {
      loadNotification();
      interval = setInterval(() => {
        loadNotification();
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [loadNotification, authReducer.isAuth, authReducer.user.role]);

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link to="/" className="flex">
          <svg
            className="mr-3 h-10"
            viewBox="0 0 52 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
              fill="#76A9FA"
            />
            <path
              d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
              fill="#A4CAFE"
            />
            <path
              d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
              fill="#1C64F2"
            />
          </svg>
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
            Rental App
          </span>
        </Link>
        <div className="flex md:order-2">
          {authReducer.isAuth ? (
            <>
              <div className="flex items-center gap-3 md:order-2">
                {authReducer.user.role === roles.SELLER && (
                  <>
                  <div className="relative">
                    <div className="relative">
                      <BellIcon
                        onClick={handleToggleNotification}
                        className="w-6 h-10 hover:text-gray-600 cursor-pointer"
                      />
                      <div
                        className={`${
                          toggleNoti ? "block" : "hidden"
                        } z-10 w-56 max-h-56 overflow-y-auto bg-white border absolute right-[50%] translate-x-[50%]`}
                      >
                        {notifications?.map((item) => (
                          <div
                            key={item._id}
                            className={`w-full flex pr-3 ${
                              !item.isRead
                                ? "bg-white"
                                : "bg-gray-400 text-white"
                            }`}
                          >
                            <div className={` font-medium`}>
                              {item.description}
                            </div>
                            <button
                              disabled={item.isRead}
                              onClick={() => markAsRead(item._id)}
                              className="disabled:cursor-not-allowed"
                            >
                              {item.isRead ? (
                                <SolidBookmark className="w-3 h-3" />
                              ) : (
                                <OutLineBookmark className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {notifications?.length > 0 && (
                      <span className="absolute right-0 top-0 rounded-full bg-blue-500 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                        {notifications?.filter((item) => !item.isRead).length}
                      </span>
                    )}
                  </div>
                  <Link
                    to="/transaction-history"
                    className="flex gap-1 text-white px-1 py-2 bg-gray-500 rounded-md cursor-pointer"
                  >
                    <ReceiptRefundIcon className="w-10 h-6 px-0 py-0 m-0" />
                    <span>Your Transaction</span>
                  </Link>
                  </>
                )}
                {authReducer.user.role === roles.USER && (
                  <Link
                    to="/deposit-history"
                    className="flex gap-1 text-white px-1 py-2 bg-gray-500 rounded-md cursor-pointer"
                  >
                    <ReceiptRefundIcon className="w-10 h-6 px-0 py-0 m-0" />
                    <span>Deposity History</span>
                  </Link>
                )}
                <Link
                    to="/message"
                    className="flex gap-1 px-1 py-2  rounded-md cursor-pointer"
                  >
                    <ChatIcon className="w-10 h-6 px-0 py-0 m-0 text-gray-500" />
                  </Link>
                <button
                  type="button"
                  className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    onClick={() => navigate("/profile")}
                    className="w-8 h-8 rounded-full"
                    src={authReducer?.user?.avatar || avatar}
                    alt="avatar"
                  />
                </button>
                <button
                  type="button"
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-ray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-ray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
          <button
            data-collapse-toggle="mobile-menu-4"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-4"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-4"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {authReducer.user.role === roles.USER && (
              <>
                <li>
                  <Link
                    to="/home"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
              </>
            )}
            {authReducer.user.role === roles.SELLER && (
              <>
                <li>
                  <Link
                    to="/home"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Manager Own Posts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Create Post
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = function (state) {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    logout: function () {
      return dispatch(logoutAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
