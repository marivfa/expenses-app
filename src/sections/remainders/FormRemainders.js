import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../../style.css'

import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Flex } from '@mantine/core'
import { GetAll, Save } from '../../commons/Api'

export default function FormRemainders() {
  const { id } = useParams()
  const isAdd = !id
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm()

  const frecuency = register('frecuency')
  const myValue = watch('frecuency', 'default')

  const [category, setCategory] = useState([])
  const [slcFrecuencyValue, setSlcFrecuencyValue] = useState()
  const [showSelectDay, setShowSelectDay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/remainders')
  }

  const handleChange = e => {
    setShowSelectDay(false)
    if (myValue === 'weekly') {
      setShowSelectDay(!showSelectDay)
    }
  }

  useEffect(() => {
    handleChange()
  }, [myValue])

  //Save Remainders
  const onSubmit = data => {
    const method = id ? 'PUT' : 'POST'
    //delete data.id
    //delete data.status
    data.id_user = 0

    const URL = id ? `remainders/${id}` : 'remainders'
    Save(URL, method, data).then(res => {
      if (res) {
        toast.success('Submitted successfully')
        onCancel()
      } else {
        toast.error(`Form submit error ${res.error} `)
      }
    })
  }

  //Get One Remainders -- Edit
  useEffect(() => {
    if (!isAdd) {
      GetAll(`remainders/${id}`).then(res => {
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
          {isAdd ? 'Add' : 'Edit'} Remainders
        </h6>
      </div>
      <div className="card-body">
        <form className="user" onSubmit={handleSubmit(onSubmit)}>
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
                aria-label="Frecuency"
                onChange={handleChange}
                onBlur={frecuency.onBlur}
                ref={frecuency.ref}
                name={frecuency.name}
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

          {showSelectDay && (
            <div>
              <div className="row form-group">
                <div className="col-sm-6">
                  <select
                    className="form-control"
                    name="repeat"
                    aria-label="Repeat"
                    {...register('repeat', { required: true })}
                  >
                    <option>Select Day</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                  <span className="form-error">
                    {errors.repeat && 'Repeat is required'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="row form-group">
            <div className="col-sm-6">
              Until Date
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

/*<div className="row form-group">
            <div className="col-sm-6">
              Remainder Date
              <input
                type="date"
                className="form-control"
                name="remainder_date"
                placeholder="Remainder Date"
                {...register('remainder_date', { required: true })}
              />
              <span className="form-error">
                {errors.remainder_date && 'Remainder Date is required'}
              </span>
            </div>
          </div>*/
