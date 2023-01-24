import { useState } from 'react'

import { useForm } from 'react-hook-form'
import FormForgotPassword from './FormForgotPassword'
import FormCreate from './FormCreate'

import '../../style.css'

import { Auth } from 'aws-amplify'

export default function FormLogin({ setToken }) {
  const [login, setLogin] = useState(true)
  const [forgotPass, setForgotPass] = useState(false)
  const [create, setCreate] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async data => {
    setLoading(true)
    setError()
    try {
      const user = await Auth.signIn(data.username, data.password)
      const profileTmp = {
        attributes: JSON.stringify(user.attributes),
        token: user.signInUserSession.idToken.jwtToken,
        profile: user.attributes.profile,
      }
      setToken(profileTmp)
      setLoading(false)

      setTimeout(function () {
        window.location.reload()
      }, 1000)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  const onClickForgotPass = e => {
    e.preventDefault()
    setLogin(false)
    setCreate(false)
    setForgotPass(true)
  }

  const onClickCreate = e => {
    e.preventDefault()
    setLogin(false)
    setCreate(true)
    setForgotPass(false)
  }

  const onClickLogin = e => {
    e.preventDefault()
    setLogin(true)
    setCreate(false)
    setForgotPass(false)
  }

  return (
    <div>
      <div>
        <h3 className="app-title">Expenses</h3>
      </div>
      {login && (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Login</h6>
          </div>
          <div className="card-body">
            <h6 className="m-0 font-weight-bold text-danger">{error}</h6>
            <hr />
            <form className="user" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="Username"
                  placeholder="Username"
                  {...register('username', {
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
                />
                <span className="form-error">
                  {errors.username && 'Username is required'}
                </span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="Password"
                  placeholder="Password"
                  {...register('password', {
                    required: true,
                    minLength: {
                      value: 8,
                      message: 'min length is 8',
                    },
                  })}
                />
                <span className="form-error">
                  {errors.password && 'Password is required'}
                </span>
              </div>
              <hr />
              <div className="offset-sm-4 col-sm-4">
                <button
                  className="btn btn-primary btn-user btn-block"
                  disabled={isLoading}
                >
                  Login
                </button>
              </div>
              <div className="text-center">
                <a
                  className="small"
                  href="#"
                  role="button"
                  onClick={onClickForgotPass}
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <a
                  className="small"
                  href="#"
                  role="button"
                  onClick={onClickCreate}
                >
                  Create an Account!
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
      {forgotPass && (
        <FormForgotPassword
          onClickCreate={onClickCreate}
          onClickLogin={onClickLogin}
        />
      )}
      {create && (
        <FormCreate
          onClickForgotPass={onClickForgotPass}
          onClickLogin={onClickLogin}
        />
      )}
    </div>
  )
}
