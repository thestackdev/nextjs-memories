import { useRef, useState } from 'react'
import { login } from 'utils/axiosAuth'
import { useDispatch } from 'react-redux'
import { setUser } from 'redux/auth'
import { delLoading, setLoading } from 'redux/utils'

const Login = () => {
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [error, seterror] = useState('')
  const [showpassword, setshowpassword] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()
    dispatch(setLoading())
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    const response = await login(payload)
    if (response.data) {
      dispatch(setUser(response.data))
    } else {
      seterror(response)
    }
    dispatch(delLoading())
  }

  const handleshowpassword = () => {
    setshowpassword(!showpassword)
  }

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
          className="icon"
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
