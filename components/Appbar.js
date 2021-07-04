import router from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { delUser } from 'redux/auth'
import { payload, toggle } from 'redux/utils'
import Link from 'next/link'

const Appbar = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [mount, setmount] = useState(false)
  const [hamburger, sethamburger] = useState(false)

  useEffect(() => {
    setmount(true)
  }, [])

  useEffect(() => {
    if (auth.token) router.replace('/')
  }, [auth.token])

  const logout = () => {
    dispatch(delUser())
  }

  const add = () => {
    dispatch(toggle())
    dispatch(payload({ type: 'New' }))
  }

  if (mount) {
    return (
      <div className="appbar__container">
        <h1>Memories</h1>
        <div
          className={`hamburger__menu ${hamburger && 'active'}`}
          onClick={() => sethamburger(!hamburger)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        {auth.token ? (
          <div className={`appbar__buttons ${hamburger && 'active'}`}>
            <span>{auth.user.username}</span>
            <button className="button button__green" onClick={add}>
              Add
            </button>
            <button className="button button__red" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={`appbar__buttons ${hamburger && 'active'}`}>
            <Link href="/auth/register">Signup</Link>
            <Link href="/auth/login">Signin</Link>
          </div>
        )}
      </div>
    )
  } else return null
}

export default Appbar
