import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Protected = () => {
  const user = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  console.log(user)

  useEffect(() => {
    if (!user.email) {
      navigate('/landing')
    }
    // eslint-disable-next-line
  }, [user.email])

  return (
    <>
      <Outlet />
    </>
  )
}

export default Protected
