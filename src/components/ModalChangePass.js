import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Auth } from 'aws-amplify'

import { Modal } from '@mantine/core'

export default function ModalChangePass({ opened, setOpened }) {
  const [error, setError] = useState()
  const [msj, setMsj] = useState()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const onSubmit = async data => {
    setError()
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      await Auth.changePassword(
        user,
        data.PreviousPassword,
        data.ProposedPassword
      )
      setMsj('Your password has been changed successfully')
      await Auth.signOut()
      localStorage.removeItem('token')
      setTimeout(function () {
        window.location.reload()
      }, 1000)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={true}
        title="Change Password"
      >
        <h6
          className={`m-0 font-weight-bold ${error && 'text-danger'} ${
            msj && 'text-success'
          }`}
        >
          {error}
          {msj}
        </h6>
        <form className="user" onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-group">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="PreviousPassword"
                placeholder="Old Password"
                {...register('PreviousPassword', { required: true })}
              />
              <span className="form-error">
                {errors.PreviousPassword && 'Previous Password is required'}
              </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="ProposedPassword"
                placeholder="New Password"
                {...register('ProposedPassword', { required: true })}
              />
              <span className="form-error">
                {errors.ProposedPassword && 'Proposed Password is required'}
              </span>
            </div>
          </div>
          <hr />
          <div className="row form-group">
            <div className="offset-sm-1 col-sm-5">
              <button className="btn btn-primary btn-user btn-block">
                Save
              </button>
            </div>
            <div className="col-sm-5">
              <button
                className="btn btn-danger btn-user btn-block"
                onClick={() => setOpened(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
