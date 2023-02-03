import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Flex } from '@mantine/core'
import { GetAll, Save } from '../../commons/Api'

export default function FormCategory() {
  const { id } = useParams()
  const isAdd = !id
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/category')
  }

  //Save Category
  const onSubmit = async data => {
    setIsLoading(true)
    const method = id ? 'PUT' : 'POST'
    const URL = id ? `category/${id}` : 'category'
    data.id_user = 0
    const res = await Save(URL, method, data)
    if (res) {
      toast.success('Submitted successfully')
      onCancel()
    } else {
      toast.error(`Form submit error ${res.error} `)
    }
    setIsLoading(false)
  }

  const getCategory = async () => {
    setIsLoading(true)
    const res = await GetAll(`category/${id}`)
    if (res) {
      Object.entries(res).forEach(([key, value]) => {
        setValue(key, value)
      })
    }
    setIsLoading(false)
  }

  //Get One Category -- Edit
  useEffect(() => {
    if (!isAdd) {
      getCategory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          {isAdd ? 'Add' : 'Edit'} Category
        </h6>
      </div>
      <div className="card-body">
        <form className="user" onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-group">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="Description"
                placeholder="Description"
                {...register('description', { required: true })}
              />
              <span className="form-error">
                {errors.description && 'description is required'}
              </span>
            </div>
            <div className="col-sm-6">
              <select
                className="form-control"
                name="type"
                {...register('type', { required: true })}
              >
                <option value="fixed">Fixed</option>
                <option value="flex">Flex</option>
                <option value="other">Other</option>
              </select>
              <span className="form-error">
                {errors.type && 'Type is required'}
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
            <Button onClick={onCancel} color="red">
              Cancel
            </Button>
          </Flex>
        </form>
      </div>
    </div>
  )
}
