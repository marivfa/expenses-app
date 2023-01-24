import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'

import FormCode from './FormCode'

import '../../style.css'

export default function FormForgotPassword({ onClickCreate, onClickLogin }) {
  const [forgotPass, setForgotPass] = useState(true)
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
      await Auth.forgotPassword(data.username)
      setForgotPass(false)
      setUserdata({ username: data.username })
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      {forgotPass ? (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Forgot Password
            </h6>
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
              <hr />
              <div className="offset-sm-4 col-sm-4">
                <button className="btn btn-primary btn-user btn-block">
                  Reset Password
                </button>
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
          type="forgotpass"
        />
      )}
    </div>
  )
}
