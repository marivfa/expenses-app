import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GetAll, Save } from '../../commons/Api'

export default function FormCategory() {
  const { id } = useParams()
  const isAdd = !id
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
  const onSubmit = data => {
    const method = id ? 'PUT' : 'POST'
    const URL = id ? `category/${id}` : 'category'
    Save(URL, method, data).then(res => {
      if (res) {
        toast.success('Submitted successfully')
        onCancel()
      } else {
        toast.error(`Form submit error ${res.error} `)
      }
    })
  }

  //Get One Category -- Edit
  useEffect(() => {
    if (!isAdd) {
      GetAll(`category/${id}`).then(res => {
        if (res) {
          Object.entries(res).forEach(([key, value]) => {
            setValue(key, value)
          })
        }
      })
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
          <div className="row form-group">
            <div className="offset-sm-4 col-sm-2">
              <button className="btn btn-primary btn-user btn-block">
                Save
              </button>
            </div>
            <div className="col-sm-2">
              <button
                className="btn btn-danger btn-user btn-block"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
