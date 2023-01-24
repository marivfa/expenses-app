import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'

import { useForm } from 'react-hook-form'

import { toast } from 'react-toastify'
import { GetAll, Save } from '../../commons/Api'

import countries from '../../data/countries.json'

export default function UsersProfile() {
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/dashboard')
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm()

  const onSubmit = data => {
    Save(`users/me`, 'PUT', data).then(res => {
      if (res) {
        toast.success('Submitted successfully')
      } else {
        toast.error(`Form submit error ${res.error} `)
      }
    })
  }

  const onAddDelegate = () => {}

  const getUser = async () => {
    setIsLoading(true)
    const res = await GetAll(`users/me`)
    if (res) {
      Object.entries(res).forEach(([key, value]) => {
        setValue(key, value)
      })
    }
    setIsLoading(false)
  }

  //Initial Data
  useEffect(() => {
    getUser()
  }, [])

  const onChange = e => {
    let index = e.target.selectedIndex
    let optionElement = e.target.childNodes[index]
    let option = optionElement.getAttribute('data')
    setValue('currency', option)
  }

  const option = countries.countries.country.map((column, index) => {
    return (
      <option key={index} data={column.currencyCode} value={column.countryCode}>
        {column.countryName}
      </option>
    )
  })

  const optionCurrency = countries.countries.country.map((column, index) => {
    return (
      <option key={index} value={column.currencyCode}>
        {column.currencyCode}
      </option>
    )
  })

  return (
    <div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary me-md-2"
          type="button"
          onClick={onAddDelegate}
        >
          Add Delegate
        </button>
      </div>
      <hr />
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">My account</h6>
        </div>
        <div className="card-body">
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
            <div className="row form-group">
              <div className="col-sm-1">
                <img
                  className="img-profile rounded-circle"
                  src="../img/undraw_profile.svg"
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col-sm-4">
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  placeholder="Upload Photo"
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="email"
                  {...register('email', { required: true, disabled: true })}
                />
              </div>
            </div>

            <div className="row form-group">
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  {...register('name', { required: true })}
                />
                <span className="form-error">
                  {errors.name && 'name is required'}
                </span>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="country"
                  {...register('country', { required: true })}
                  onChange={onChange}
                >
                  <option value="">Select Country</option>
                  {option}
                </select>
                <span className="form-error">
                  {errors.country && 'Country is required'}
                </span>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-sm-4">
                <select
                  className="form-control"
                  name="country"
                  {...register('currency', { required: true })}
                >
                  <option value="">Select currency</option>
                  {optionCurrency}
                </select>
                <span className="form-error">
                  {errors.currency && 'Currency is required'}
                </span>
              </div>
            </div>

            <div className="row form-group">
              <div className="col-sm-4">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                />
                <span className="form-error">
                  {errors.password && 'Password is required'}
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
    </div>
  )
}
