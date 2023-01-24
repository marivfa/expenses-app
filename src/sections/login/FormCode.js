import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'

import { SaveUser } from '../../commons/Api'
import '../../style.css'

export default function FormCode({ userdata, onClickLogin, type }) {
  const [error, setError] = useState()
  const [msj, setMsj] = useState()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async data => {
    try {
      if (type === 'create') {
        await Auth.confirmSignUp(userdata.username, data.code)
        const user = await Auth.currentSession()
        await onCreateUser(user.idToken.jwtToken)
      } else if (type === 'forgotpass') {
        await Auth.forgotPasswordSubmit(
          userdata.username,
          data.code,
          data.password
        )
        setMsj('Your password has been changed successfully')
        setTimeout(function () {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const onCreateUser = async token => {
    let data = {
      name: userdata.name,
      email: userdata.username,
      active: 'Y',
      type: 'admin',
      master_id: 0,
    }
    const res = await SaveUser('users', 'POST', data, token)
    if (res) {
      setMsj('User has been created successfully')
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    }
  }

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Verification Code
          </h6>
        </div>
        <div className="card-body">
          <h6
            className={`m-0 font-weight-bold ${error && 'text-danger'} ${
              msj && 'text-success'
            }`}
          >
            {error}
            {msj}
          </h6>
          <hr />
          <span>
            A confirmation code has already been sent to your e-mail address.
          </span>
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="Code"
                placeholder="Code"
                {...register('code', { required: true })}
              />
              <span className="form-error">
                {errors.code && 'Code is required'}
              </span>
            </div>

            {type === 'forgotpass' && (
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
            )}

            <hr />
            <div className="offset-sm-4 col-sm-4">
              <button className="btn btn-primary btn-user btn-block">
                Send code
              </button>
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
    </div>
  )
}
