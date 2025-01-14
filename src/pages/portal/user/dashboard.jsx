import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Announcement from '../../../components/portal/user/dashboard/Announcement'
import TimeCard from '../../../components/portal/user/dashboard/TimeCard'
import StatisticCard from '../../../components/ui/cards/StatisticCard'
import PageTitle from '../../../components/ui/titles/PageTitle'
import * as RestApi from '../../../utils/rest_api_util'

const Dashboard = () => {
  const navigate = useNavigate()
  const [isClockIn, setIsClockIn] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [weekly, setWeekly] = useState(0)
  const [monthly, setMonthly] = useState(0)
  const [normalRate , setNormalRate] = useState(0)

  useEffect(() => {
    getDashboard()
    // eslint-disable-next-line
  }, [])

  const getDashboard = async () => {
    try {
      const result = await RestApi.getDashboard()
      const response = await result.json()
      if (result.status === 200) {
        setIsClockIn(response.isClockIn)
        setAnnouncements(response.announcements)
        setWeekly(response.weekly)
        setMonthly(response.monthly)
        setNormalRate(response.rate.normal)
      }
      if (result.status === 401) {
        localStorage.clear()
        navigate('/')
      }
    } catch (error) {}
  }

  return (
    <div>
      <PageTitle title='Dashboard' />
      <div className='grid grid-cols-1 md:grid-cols-6 gap-5'>
        <div className='md:col-span-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {/* My Sweldo */}
            <StatisticCard name='weekly' value={weekly} />
            <StatisticCard name='monthly' value={monthly} />
            <StatisticCard name='rate' value={normalRate} />
            <StatisticCard name='expected salary' value={monthly * normalRate} />
         
            {/* Graph and attendance */}
            <div className='md:col-span-2 lg:col-span-4 bg-white shadow p-5'>
              Attendance
            </div>
          </div>
        </div>
        {/* Announcement */}
        <div className='md:col-span-2 bg-white shadow p-5'>
          <h1 className=' flex justify-center font-bold text-xl '>
            Announcement
          </h1>
          <Announcement announcements={announcements} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
