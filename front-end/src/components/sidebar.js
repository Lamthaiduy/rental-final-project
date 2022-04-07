import {NavLink, useNavigate} from 'react-router-dom'
import {ChartPieIcon, UserGroupIcon, LogoutIcon, BookmarkAltIcon, PencilAltIcon, CreditCardIcon, CashIcon} from '@heroicons/react/solid'
import {logoutAction} from '../reducers/action/authAction';
import { connect } from 'react-redux';

function SideBar(props) {
  const { logout } = props;
  const navigate = useNavigate();
  function handleLogout(e) {
      e.preventDefault();
      logout();
      navigate('/login');
  }
  return (
    <>
      <aside className="w-64 h-full" aria-label="Sidebar">
        <div className="overflow-y-auto h-full py-4 px-3 bg-gray-200 rounded dark:bg-gray-800">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChartPieIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/users"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserGroupIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/sellers"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <UserGroupIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Sellers</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/categories"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <BookmarkAltIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/waiting"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <PencilAltIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Waiting Posts</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/refund"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <CreditCardIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Refund Requests</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <CashIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Payment Requests</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                onClick={handleLogout}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <LogoutIcon className='w-10 h-10 text-gray-600' />
                <span className="ml-3">Logout</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

const mapStateToProps = function (state) {
  return {
    authReducer: state.authReducer,
  };
};


const mapDispatchToProps = function (dispatch) {
  return {
      logout: function() {
          return dispatch(logoutAction());
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);