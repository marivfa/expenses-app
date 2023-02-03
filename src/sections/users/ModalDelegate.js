import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Modal, Button } from '@mantine/core'
import { Save } from '../../commons/Api'

import '../../style.css'

export default function ModalDelegate({
  opened,
  setOpened,
  country,
  currency,
}) {
  const [isLoading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  const onSubmit = async data => {
    setLoading(true)
    data.type = 'delegate'
    data.master_id = 0
    data.active = 'Y'
    data.country = country
    data.currency = currency
    const res = await Save('users', 'POST', data)
    if (res) {
      toast.success('User created successfully')

      setTimeout(function () {
        reset()
        setOpened(false)
      }, 1000)
    } else {
      toast.error(`Form submit error ${res.error} `)
    }
    setLoading(false)
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
        <div className="card shadow mb-4">
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
                <Button type="submit" loading={isLoading}>
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}
