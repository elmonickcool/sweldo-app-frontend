import { useEffect, useState } from 'react'
import SubmitTimeButton from '../ui/buttons/SubmitTimeButton'
import * as RestApi from '../../utils/rest_api_util'
import SuccessAlert from '../ui/alerts/SuccessAlert'

const TimeCard = ({ isClockIn }) => {
  const [timeIn, setTimeIn] = useState(true)
  const [timeOut, setTimeOut] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [success, setSuccess] = useState()

  // button time in function
  const handleTimeIn = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)
    try {
      const result = await RestApi.clockIn()
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }
      if (result.status === 200) {
        setTimeOut(true)
        setTimeIn(false)
      }
      setSuccess(response)
    } catch (error) {}
    setLoading(false)
  }

  // rerender the isClockIn state after clock in
  //and clean the success message after 3 seconds
  useEffect(() => {
    RestApi.getDashboard()

    const timer = setTimeout(() => {
      setSuccess(undefined)
    }, 3000)
    return () => clearTimeout(timer)
  }, [isClockIn])

  //button timeout function
  const handleTimeOut = async () => {
    setLoading(true)
    setError(undefined)
    setSuccess(undefined)
    try {
      const result = await RestApi.clockOut()
      const response = await result.json()
      if (result.status === 400) {
        setError(response)
      }
      if (result.status === 200) {
        setTimeOut(false)
        setTimeIn(true)
      }
      setSuccess(response)
    } catch (error) {}
    setLoading(false)
  }

  return (
    //default Time In button
    <>
      {
        // if User already clock in, show Time Out button
        isClockIn ? (
          <>
            <SubmitTimeButton name='Time Out' onClick={handleTimeOut} />
            <SuccessAlert message={success?.message} />
          </>
        ) : (
          // if User already clock out, show Time In button
          <>
            <SubmitTimeButton name='Time In' onClick={handleTimeIn} />
            <SuccessAlert message={success?.message} />
          </>
        )
      }
    </>
  )
}

export default TimeCard