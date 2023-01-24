import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className='p-5 bg-gray-500 h-screen'>
      <div>
        <ul className='space-y-5'>
          <li>
            <NavLink
              to='dashboard'
              className='bg-blue-700 hover:bg-blue-500 text-white px-4 py-2'
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to='dashboard'
              className='hover:bg-blue-500 text-white px-4 py-2'
            >
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink
              to='dashboard'
              className='hover:bg-blue-500 text-white px-4 py-2'
            >
              My Sweldo
            </NavLink>
          </li>
          <li>
            <NavLink
              to='dashboard'
              className='hover:bg-blue-500 text-white px-4 py-2'
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to='dashboard'
              className='hover:bg-blue-500 text-white px-4 py-2'
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar
