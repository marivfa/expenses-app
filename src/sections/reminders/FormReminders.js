import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Flex , Modal} from '@mantine/core'
import { GetAll, Save } from '../../commons/Api'
import '../../style.css'

export default function FormReminders({ opened, setOpened, loadMore , id}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm()

  const frecuency = register('frecuency')
  const myValue = watch('frecuency', 'default')

  const [slcFrecuencyValue, setSlcFrecuencyValue] = useState()
  const [showSelectDay, setShowSelectDay] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onCancel = () => {
      reset()
      setOpened(false)
  }

  const handleChange = e => {
    setShowSelectDay(false)
    /*if (myValue === 'weekly') {
      setShowSelectDay(!showSelectDay)
    }*/
  }

  useEffect(() => {
    handleChange()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myValue])

  //Save Reminders
  const onSubmit = async data => {
    const method = id ? 'PUT' : 'POST'
     data.id_user = 0
    if(data.frecuency === 'none'){
      data.until_date = data.remainder_date
    }

    const URL = id ? `remainders/${id}` : 'remainders'
    const res = await Save(URL, method, data)
    if (res) {
      toast.success('Submitted successfully')
      reset()
      setOpened(false)
      await loadMore(0)
    } else {
      toast.error(`Form submit error ${res.error} `)
    }
  }

  const getReminder = async () => {
    setIsLoading(true)
    const res = await GetAll(`remainders/${id}`)
    if (res) {
      Object.entries(res).forEach(([key, value]) => {
        setValue(key, value)
      })
    }
    setIsLoading(false)
  }


  //Get One Reminders -- Edit
  useEffect(() => {
    if (id > 0) {
      getReminder()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={true}
        title={id === 0 ? 'Add Reminder' : 'Edit Reminder'}
      >
        <form className="user" onSubmit={handleSubmit(onSubmit)}>
          <div className="row form-group">
            <div className="col-sm-12">
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
            <div className="col-sm-12">
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
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
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
            <div className="col-sm-12">
              Reminder Date
              <input
                type="date"
                className="form-control"
                name="remainder_date"
                placeholder="Reminder Date"
                {...register('remainder_date', { required: true })}
              />
              <span className="form-error">
                {errors.remainder_date && 'Reminder Date is required'}
              </span>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-sm-12">
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
      </Modal>
  )
}