import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Flex } from '@mantine/core'
import { Auth } from 'aws-amplify'
import FormCode from './FormCode'

import '../../style.css'

export default function FormCreate({ onClickForgotPass, onClickLogin }) {
  const [create, setCreate] = useState(true)
  const [userdata, setUserdata] = useState([])
  const [error, setError] = useState()
  const [isLoading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async data => {
    setError()
    setLoading(true)
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
    setLoading(false)
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
              <Flex
                mih={50}
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button type="submit" loading={isLoading}>
                  Register Account
                </Button>
              </Flex>

              <div className="text-center">
                <a
                  className="small"
                  href="/"
                  role="button"
                  onClick={onClickForgotPass}
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <a
                  className="small"
                  href="/"
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
