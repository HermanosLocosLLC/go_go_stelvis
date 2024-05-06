import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Protected = () => {
  const { email } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!email) {
      navigate('/landing')
    }
    // eslint-disable-next-line
  }, [email])

  return (
    <>
      <Outlet />
    </>
  )
}

export default Protected
