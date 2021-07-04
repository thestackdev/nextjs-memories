import { useEffect, useRef, useState } from 'react'
import { login } from 'utils/axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Loading from 'components/Loading'
import router from 'next/router'
import { setUser } from 'redux/auth'

const Login = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const auth = useSelector((state) => state.auth)
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState('')
  const [showpassword, setshowpassword] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.token) router.replace('/')
    else setloading(false)
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setloading(true)
    const response = await login(payload)
    if (response.success) {
      dispatch(setUser(response.success))
    } else {
      setloading(false)
      seterror(response)
    }
  }

  const handleshowpassword = () => {
    setshowpassword(!showpassword)
  }

  if (loading) return <Loading />

  return (
    <form onSubmit={onSubmit} className="login__container">
      <h1 className="sign__header">Welcome back</h1>
      <span className="error">{error}</span>
      <div className="input__container">
        <img className="icon" src="/icons/email.svg" />
        <input required type="email" placeholder="email" ref={emailRef} />
      </div>
      <div className="input__container">
        <img className="icon" src="/icons/lock.svg" />
        <input
          required
          type={showpassword ? 'text' : 'password'}
          placeholder="password"
          ref={passwordRef}
        />
        <img
          className="icon button"
          src={showpassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'}
          onClick={handleshowpassword}
        />
      </div>
      <button className="button button__black" type="submit">
        Login
      </button>
    </form>
  )
}
export default Login
