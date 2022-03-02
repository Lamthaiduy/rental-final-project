import {NavLink} from 'react-router-dom'
import {ChartPieIcon, UserGroupIcon} from '@heroicons/react/solid'

function SideBar() {
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
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideBar;