import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Auth } from 'aws-amplify'
import FormCode from './FormCode'

import '../../style.css'

export default function FormCreate({ onClickForgotPass, onClickLogin }) {
  const [create, setCreate] = useState(true)
  const [userdata, setUserdata] = useState([])
  const [error, setError] = useState()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async data => {
    setError()
    try {
      await Auth.signUp({
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

      setCreate(false)
      setUserdata({ username: data.email, name: data.name })
    } catch (error) {
      setError(error.message)
    }
  }

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
            <h6 className="m-0 font-weight-bold text-danger">{error}</h6>
            <hr />
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
                  type="email"
                  className="form-control"
                  name="Email"
                  placeholder="Email"
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Entered value does not match email format',
                    },
                  })}
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
                <button className="btn btn-primary btn-user btn-block">
                  Register Account
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
                  onClick={onClickLogin}
                >
                  Already have an account? Login!
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <FormCode
          userdata={userdata}
          onClickLogin={onClickLogin}
          type="create"
        />
      )}
    </div>
  )
}
