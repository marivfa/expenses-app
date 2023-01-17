import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'
import { Save } from '../../commons/Api'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify'

export default function FormCode({ userdata }) {
  const [login, setLogin] = useState(true)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const onSubmit = async data => {
    try {
      await Auth.confirmSignUp(userdata.username, data.code)
      onCreateUser()
    } catch (error) {
      console.log('error confirming sign up', error)
    }
  }

  const onCreateUser = () => {
    let data = {
      name: userdata.name,
      email: userdata.username,
      active: 'Y',
      type: 'admin',
      master_id: 0,
    }
    Save('users', 'POST', data).then(res => {
      if (res) {
        toast.success('Submitted successfully')
        setTimeout(function () {
          window.location.reload()
        }, 1000)
      } else {
        //toast.error(`Form submit error ${res.error} `)
      }
    })
  }

  const onClickResend = async data => {
    /*try {
      await Auth.resendSignUp(userdata.username)
      console.log('code resent successfully')
    } catch (err) {
      console.log('error resending code: ', err)
    }*/
  }

  //general comment change the double quotation marks for single quotation with prettier.

  return (
    <div>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Verification Code
          </h6>
        </div>
        <div className="card-body">
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
                onClick={onClickResend}
              >
                Resend Code
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
