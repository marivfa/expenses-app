import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'

import { useForm } from 'react-hook-form'

import { Auth } from 'aws-amplify'
import FormCode from './FormCode'

export default function FormCreate() {
  const [create, setCreate] = useState(true)
  const [userdata, setUserdata] = useState([])
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const onSubmit = async data => {
    try {
      //remove user variable if you don't need it
      const { user } = await Auth.signUp({
        username: data.email,
        password: data.password,
        attributes: {
          email: data.email, // optional
          name: data.name,
          // other custom attributes
        },
        autoSignIn: {
          // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      })
      //console.log(user)
      setCreate(false)
      setUserdata({ username: data.email, name: data.name })
    } catch (error) {
      console.log('error signing up:', error)
    }
  }
//general comment change the double quotation marks for single quotation with prettier.
  return (
    <div>
      {create ? (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Create an Account
            </h6>
          </div>
          <div className="card-body">
            <form className="user" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="Name"
                  placeholder="Name"
                  {...register('name', { required: true })}
                />
                <span className="form-error">
                  {errors.name && 'Name is required'}
                </span>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="Email"
                  placeholder="Email"
                  {...register('email', { required: true })}
                />
                <span className="form-error">
                  {errors.email && 'Email is required'}
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
                <button className="btn btn-primary btn-user btn-block">
                  Register Account
                </button>
              </div>
              <div className="text-center">
                <a className="small" href="forgot-password.html">
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <a className="small" href="register.html">
                  Already have an account? Login!
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <FormCode userdata={userdata} />
      )}
    </div>
  )
}
