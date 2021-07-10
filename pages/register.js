import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { register } from 'utils/axiosAuth'
import { setUser } from 'redux/auth'
import { delLoading, setLoading } from 'redux/utils'

const Register = () => {
  const userRef = useRef('')
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const _passwordRef = useRef('')
  const dispatch = useDispatch()
  const [showpassword, setshowpassword] = useState(false)
  const [error, seterror] = useState('')

  const checkPasswords = () => {
    return passwordRef.current.value === _passwordRef.current.value
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (checkPasswords()) {
      dispatch(setLoading())
      const payload = {
        username: userRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }
      const response = await register(payload)
      if (response.success) {
        dispatch(setUser(response.success))
      } else {
        seterror(response)
      }
      dispatch(delLoading())
    } else {
      seterror(`Passwords did't match`)
    }
  }

  const handleshowpassword = () => {
    setshowpassword(!showpassword)
  }

  return (
    <form onSubmit={onSubmit} className="register__container">
      <h1 className="sign__header">Join us</h1>
      <span className="error">{error}</span>
      <div className="input__container">
        <img className="icon" src="/icons/user.svg" />
        <input placeholder="username" ref={userRef} />
      </div>
      <div className="input__container">
        <img className="icon" src="/icons/email.svg" />
        <input type="email" placeholder="email" ref={emailRef} />
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
      <div className="input__container">
        <img className="icon" src="/icons/lock.svg" />
        <input
          required
          type={showpassword ? 'text' : 'password'}
          placeholder="password repeat"
          ref={_passwordRef}
        />
        <img
          className="icon button"
          src={showpassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'}
          onClick={handleshowpassword}
        />
      </div>
      <button className="button button__black" type="submit">
        Register
      </button>
    </form>
  )
}

export default Register
