import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Modal, Button } from '@mantine/core'
import { Save } from '../../commons/Api'

import '../../style.css'

export default function ModalDelegate({ opened, setOpened }) {
  const [error, setError] = useState()
  const [msj, setMsj] = useState()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async data => {
    data.type = 'delegate'
    const res = await Save('users', 'POST', data)
    if (res) {
      setMsj('User has been created successfully')
    }
  }

  return (
    <div>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={true}
        title="Add Delegate"
      >
        <h6
          className={`m-0 font-weight-bold ${error && 'text-danger'} ${
            msj && 'text-success'
          }`}
        >
          {error}
          {msj}
        </h6>
        <div className="card shadow mb-4">
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
              <Button>Register</Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}
