import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'

import { useForm } from 'react-hook-form'
import FormForgotPassword from './FormForgotPassword'
import FormCreate from './FormCreate'

import { Auth, Cache } from 'aws-amplify'

export default function FormLogin({ setToken }) {
  const [login, setLogin] = useState(true)
  const [forgotPass, setForgotPass] = useState(false)
  const [create, setCreate] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const onSubmit = async data => {
    setLoading(true)
    try {
      const user = await Auth.signIn(data.username, data.password)
      //console.log(user)
      const profileTmp = {
        attributes: JSON.stringify(user.attributes),
        token: user.signInUserSession.idToken.jwtToken,
        profile: user.attributes.profile,
      }
      setToken(profileTmp)
      setLoading(false)
      //remove unnecessary code 
      /*setTimeout(function () { 
        window.location.reload()
      }, 1000)*/
    } catch (error) {
      //here you need an action, for example: you are putting loading = true at the beginning of the function, what happens if the function goes into catch
      console.log('error signing in', error)
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
 //general comment change the double quotation marks for single quotation with prettier.
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
            <form className="user" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="Username"
                  placeholder="Username"
                  {...register('username', { required: true })}
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
                  {...register('password', { required: true })}
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
      {forgotPass && <FormForgotPassword />}
      {create && <FormCreate />}
    </div>
  )
}
