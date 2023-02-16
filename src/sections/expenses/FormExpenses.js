import { useEffect, useState } from 'react'
import { Select, Button, Flex, Modal} from '@mantine/core'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { GetAll, Save } from '../../commons/Api'
import '../../style.css'

export default function FormExpenses({ opened, setOpened, loadMore , id}) {
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm()

  const [categoryId, setCategoryId] = useState(0)
  const [category, setCategory] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onCancel = () => {
      reset()
      setOpened(false)
  }

  const handleChangeForm = id => {
    setCategoryId(id)
    setValue('id_category', id, {
      shouldValidate: true,
    })
  }

  /*const handleCheckClick = () => {
    setShowForm(!showForm)
  }*/

  //Save Expenses
  const onSubmit = async data => {
    setIsLoading(true)
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
    const res = await Save(URL, method, data)
    if (res) {
      toast.success('Submitted successfully')
      reset()
      setOpened(false)
      setCategoryId(0)
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
        setValue(key, value)
        if (key === 'id_category') {
          setCategoryId(value)
        }
      })
    }
    setIsLoading(false)
  }

  const getCategory = async () => {
    const res = await GetAll('category')
    if (res) {
      //setCategory(res)
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
        <form className="user" onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-group">
            <div className="col-sm-12">
              <Select
                label="Select Category"
                placeholder="Pick one"
                searchable
                nothingFound="No options"
                radius="xl"
                onChange={handleChangeForm}
                data={category}
                value={categoryId}
              />
              <span className="form-error">
                {errors.category_id && 'Category is required'}
              </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
            <input
                type="number"
                className="form-control"
                name="amount"
                placeholder="Amount"
                {...register('amount', { required: true ,valueAsNumber: true})}
              />

              <span className="form-error">
                {errors.amount && 'Amount is required'}
              </span>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
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
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                name="comment"
                placeholder="Comment"
                {...register('comment')}
              />
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