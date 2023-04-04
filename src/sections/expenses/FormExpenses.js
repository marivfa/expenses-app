import { useEffect, useState } from 'react'
import { Button, Flex, Modal, SimpleGrid } from '@mantine/core'
import { useForm, Controller } from 'react-hook-form'
import moment from 'moment'
import { toast } from 'react-toastify'
import { GetAll, Save } from '../../commons/Api'

import {
  InputText,
  InputDate,
  InputNumber,
  InputSelect,
} from '../../components/Inputs'

import '../../style.css'

export default function FormExpenses({ opened, setOpened, loadMore, id }) {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_category: 0,
      amount: 0,
      real_date: new Date(),
      comment: '',
    },
  })

  const [category, setCategory] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //Save Expenses
  const onSubmit = async data => {
    data.id_user = 0
    const values = {
      ...data,
      real_date: moment(data.real_date).format('YYYY-MM-DD'), // format the date value to match your backend format
    }

    setIsLoading(true)
    const method = id ? 'PUT' : 'POST'

    /*if (showForm) {
      data.remainders = {
        description: data.description,
        frecuency: data.frecuency,
        until_date: data.until_date,
        id_user: 0,
      }
      delete data.description
      delete data.frecuency
      delete data.until_date
    }*/

    const URL = id ? `expenses/${id}` : 'expenses'
    const res = await Save(URL, method, values)
    if (res) {
      toast.success('Submitted successfully')
      reset()
      setOpened(false)
      await loadMore(0)
    } else {
      toast.error(`Form submit error ${res.error} `)
    }
    setIsLoading(false)
  }

  const getExpenses = async () => {
    setIsLoading(true)
    const res = await GetAll(`expenses/${id}`)
    if (res) {
      Object.entries(res).forEach(([key, value]) => {
        if (key === 'real_date') {
          const date = moment(value).format('ddd MMM DD YYYY HH:mm:ss')
          const newDate = new Date(date)
          setValue(key, newDate)
        } else {
          setValue(key, value)
        }
      })
    }
    setIsLoading(false)
  }

  const getCategory = async () => {
    const res = await GetAll('category')
    if (res) {
      let arrCategory = []
      Object.entries(res).forEach(([key, value]) => {
        let objTmp = {
          value: value.id,
          label: value.description,
          group: value.type,
        }
        arrCategory.push(objTmp)
      })
      setCategory(arrCategory)
    }
  }

  //Get One Expenses -- Edit
  useEffect(() => {
    if (id > 0) {
      getExpenses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  //Get Category -- Autocomplete
  useEffect(() => {
    getCategory()
  }, [])

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={true}
      title={id === 0 ? 'Add Expenses' : 'Edit Expenses'}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
          <div>
            <Controller
              name="id_category"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                validate: value => value > 0,
              }}
              render={({ field }) => (
                <InputSelect
                  label="Select Category"
                  placeholder="Pick one"
                  data={category}
                  field={field}
                />
              )}
            />
            <span className="form-error">
              {errors.id_category && 'Select a category'}
            </span>
          </div>
          <div>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                validate: value => value > 0,
              }}
              render={({ field }) => (
                <InputNumber label="Amount" field={field} />
              )}
            />
            <span className="form-error">
              {errors.amount && 'Amount must to be greater than 0'}
            </span>
          </div>
          <div>
            <Controller
              name="real_date"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                valueAsDate: true,
              }}
              render={({ field }) => (
                <InputDate
                  placeholder="Pick real date"
                  label="Real date"
                  field={field}
                />
              )}
            />
            <span className="form-error">
              {errors.real_date && 'Pick up a date'}
            </span>
          </div>
          <div>
            <Controller
              name="comment"
              control={control}
              render={({ field }) => (
                <InputText
                  label="Comment"
                  placeholder="Comment"
                  field={field}
                />
              )}
            />
          </div>
        </SimpleGrid>
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
          <Button
            color="red"
            onClick={() => {
              setOpened(false)
              reset()
            }}
          >
            Cancel
          </Button>
        </Flex>
      </form>
    </Modal>
  )
}

/*
<div className="row form-group">
            <div className="col-sm-12">
              <span>Mark as reminder</span>
              <input
                className="form-control"
                name="is_remainder"
                type="checkbox"
                onClick={handleCheckClick}
              />
            </div>
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

*/
