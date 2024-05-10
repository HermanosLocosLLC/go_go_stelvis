import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppSelector } from '../../hooks/useRedux'

const Protected = () => {
  const user = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  console.log(user)

  useEffect(() => {
    if (!user.email) {
      navigate('/landing')
    }
    // eslint-disable-next-line
  }, [user])

  return (
    <>
      <Outlet />
    </>
  )
}

export default Protected
