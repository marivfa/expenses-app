import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Autocomplete from '../../components/Autocomplete'
import '../../style.css'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GetAll, Save } from '../../commons/Api'

export default function FormExpenses() {
  const { id } = useParams()
  const isAdd = !id
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState([])
  const [showForm, setShowForm] = useState(false)

  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/expenses')
  }

  const handleChangeForm = id => {
    setValue('id_category', id, {
      shouldValidate: true,
    })
  }

  const handleCheckClick = () => {
    setShowForm(!showForm)
  }

  //Save Expenses
  const onSubmit = data => {
    const method = id ? 'PUT' : 'POST'
    //delete data.id
    //delete data.status
    data.id_user = 0

    if (showForm) {
      data.remainders = {
        description: data.description,
        frecuency: data.frecuency,
        until_date: data.until_date,
        id_user: 0,
      }
      delete data.description
      delete data.frecuency
      delete data.until_date
    }

    const URL = id ? `expenses/${id}` : 'expenses'
    Save(URL, method, data).then(res => {
      if (res) {
        toast.success('Submitted successfully')
        onCancel()
      } else {
        toast.error(`Form submit error ${res.error} `)
      }
    })
  }

  //Get One Expenses -- Edit
  useEffect(() => {
    if (!isAdd) {
      GetAll(`expenses/${id}`).then(res => {
        if (res) {
          console.log(res)
          Object.entries(res).forEach(([key, value]) => {
            setValue(key, value)
            if (key === 'category') {
              setCategoryName(value)
            }
          })
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //Get Category -- Autocomplete
  useEffect(() => {
    GetAll('category').then(res => {
      if (res) {
        setCategory(res)
      }
    })
  }, [])

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">
          {isAdd ? 'Add' : 'Edit'} Expenses
        </h6>
      </div>
      <div className="card-body">
        <form className="user" onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-group">
            <div className="col-sm-6">
              <span> Select Category</span>
              <Autocomplete
                suggestions={category}
                handleChangeForm={handleChangeForm}
                categoryName={categoryName}
              />
              <span className="form-error">
                {errors.category_id && 'Category is required'}
              </span>
            </div>
            <div className="col-sm-6"></div>
          </div>
          <div className="row form-group">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="amount"
                placeholder="Amount"
                {...register('amount', { required: true })}
              />
              <span className="form-error">
                {errors.amount && 'Amount is required'}
              </span>
            </div>
            <div className="col-sm-6"></div>
          </div>

          <div className="row form-group">
            <div className="col-sm-6">
              Real Date
              <input
                type="date"
                className="form-control"
                name="real_date"
                placeholder="Realdate Date"
                {...register('real_date', { required: true })}
              />
              <span className="form-error">
                {errors.real_date && 'Real Date is required'}
              </span>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm-6">
              <input
                type="text"
                className="form-control"
                name="comment"
                placeholder="Comment"
                {...register('comment')}
              />
            </div>
            <div className="col-sm-6"></div>
          </div>

          <div className="row form-group">
            <div className="col-sm-6">
              <span>Mark as remainder</span>
              <input
                className="form-control"
                name="is_remainder"
                type="checkbox"
                onClick={handleCheckClick}
              />
            </div>
            <div className="col-sm-6"></div>
          </div>

          {showForm && (
            <div>
              <div className="row form-group">
                <div className="col-sm-6">
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    {...register('description', { required: true })}
                  />
                  <span className="form-error">
                    {errors.description && 'Description is required'}
                  </span>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-6">
                  <select
                    className="form-control"
                    name="frecuency"
                    aria-label="Frecuency"
                    {...register('frecuency', { required: true })}
                  >
                    <option>Select Frecuency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="annual">Annual</option>
                    <option value="none">None</option>
                  </select>
                  <span className="form-error">
                    {errors.frecuency && 'Frecuency is required'}
                  </span>
                </div>
              </div>
              <div className="row form-group">
                <div className="col-sm-6">
                  <input
                    type="date"
                    className="form-control"
                    name="until_date"
                    placeholder="Until Date"
                    {...register('until_date', { required: true })}
                  />
                  <span className="form-error">
                    {errors.until_date && 'Until Date is required'}
                  </span>
                </div>
              </div>
            </div>
          )}

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
