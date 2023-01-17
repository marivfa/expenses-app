import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'

import { useForm } from 'react-hook-form'

export default function FormForgotPassword() {
  const [login, setLogin] = useState(true)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const onSubmit = data => {}

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Forgot Password</h6>
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
            <hr />
            <div className="offset-sm-4 col-sm-4">
              <button className="btn btn-primary btn-user btn-block">
                Reset Password
              </button>
            </div>
            <div className="text-center">
              <a className="small" href="register.html">
                Create an Account!
              </a>
            </div>
            <div className="text-center">
              <a className="small" href="forgot-password.html">
                Already have an account? Login!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
