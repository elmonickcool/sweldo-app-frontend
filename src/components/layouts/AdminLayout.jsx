import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import PortalNavbar from '../PortalNavbar'
import Sidebar from '../Sidebar'

const AdminLayout = () => {
  const navigate = useNavigate()
  const [activeSidebar, setActiveSidebar] = useState(true)

  useEffect(() => {
    const isAdmin = localStorage.getItem('is_admin')
    const token = localStorage.getItem('token')
    if (!token || !isAdmin) {
      navigate('/')
      return
    }
    if (isAdmin === '0') {
      navigate('/dashboard')
      return
    }
    // eslint-disable-next-line
  }, [])

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar)
  }

  return (
    <div className='flex overflow-x-hidden h-screen'>
      <Sidebar activeSidebar={activeSidebar} />
      <div className='flex-1'>
        <PortalNavbar toggleSidebar={toggleSidebar} />
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
