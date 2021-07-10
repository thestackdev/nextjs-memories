import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delUser } from 'redux/auth'
import { setLoading, delLoading, setModal } from 'redux/utils'
import Loading from 'components/Loading'

const Appbar = () => {
  const { utils, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => dispatch(setLoading())
    const handleRouteChangeComplete = () => dispatch(delLoading())

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  useEffect(() => {
    if (auth.token) {
      if (router.pathname === '/login' || router.pathname === '/register') {
        router.replace('/memories')
      } else router.replace('/memories')
    } else router.replace('/memories')
  }, [auth.token])

  const logout = () => dispatch(delUser())

  const add = () => dispatch(setModal())

  const AppbarButtons = () => {
    if (auth.token) {
      return (
        <div className="appbar__buttons">
          <button className="button button__green" onClick={add}>
            Add
          </button>
          <button className="button button__red" onClick={logout}>
            Logout
          </button>
        </div>
      )
    } else {
      return (
        <div className="appbar__buttons">
          {router.pathname === '/login' ? (
            <button
              className="button button__black"
              onClick={() => router.push('/register')}
            >
              Register
            </button>
          ) : (
            <button
              className="button button__black"
              onClick={() => router.push('/login')}
            >
              Login
            </button>
          )}
        </div>
      )
    }
  }

  if (utils.loading) return <Loading />

  return (
    <div className="appbar__container">
      <h1>Memories</h1>
      <AppbarButtons />
    </div>
  )
}

export default Appbar
