import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Auth } from 'aws-amplify'

import { Modal, Button, Flex } from '@mantine/core'

export default function ModalChangePass({ opened, setOpened }) {
  const [error, setError] = useState()
  const [msj, setMsj] = useState()
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
      const user = await Auth.currentAuthenticatedUser()
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
    setLoading(false)
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
                {...register('PreviousPassword', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'min length is 8',
                  },
                })}
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
                {...register('ProposedPassword', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'min length is 8',
                  },
                })}
              />
              <span className="form-error">
                {errors.ProposedPassword && 'Proposed Password is required'}
              </span>
            </div>
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
              Save
            </Button>
            <Button onClick={() => setOpened(false)} color="red">
              Cancel
            </Button>
          </Flex>
        </form>
      </Modal>
    </div>
  )
}
