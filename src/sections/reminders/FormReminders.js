import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Flex, Modal, SimpleGrid } from '@mantine/core'
import moment from 'moment'
import { GetAll, Save } from '../../commons/Api'
import { InputText, InputDate, InputSelect } from '../../components/Inputs'
import '../../style.css'

export default function FormReminders({ opened, setOpened, loadMore, id }) {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: '',
      frecuency: '',
      remainder_date: new Date(),
      until_date: new Date(),
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  //Save Reminders
  const onSubmit = async data => {
    const method = id ? 'PUT' : 'POST'
    data.id_user = 0
    if (data.frecuency === 'none') {
      data.until_date = data.remainder_date
    }

    const values = {
      ...data,
      until_date: moment(data.until_date).format('YYYY-MM-DD'), // format the date value to match your backend format
      remainder_date: moment(data.remainder_date).format('YYYY-MM-DD'),
    }

    const URL = id ? `remainders/${id}` : 'remainders'
    const res = await Save(URL, method, values)
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
        if (key === 'until_date' || key === 'remainder_date') {
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
        <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
          <div>
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                validate: value => value !== '',
              }}
              render={({ field }) => (
                <InputText
                  label="Description"
                  placeholder="Description"
                  field={field}
                />
              )}
            />
            <span className="form-error">
              {errors.description && 'Description is required'}
            </span>
          </div>

          <div>
            <Controller
              name="frecuency"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                validate: value => value !== '',
              }}
              render={({ field }) => (
                <InputSelect
                  label="Select Frecuency"
                  placeholder="Pick one"
                  data={[
                    { value: 'none', label: 'None' },
                    { value: 'daily', label: 'Daily' },
                    { value: 'weekly', label: 'Weekly' },
                    { value: 'monthly', label: 'Monthly' },
                  ]}
                  field={field}
                />
              )}
            />
            <span className="form-error">
              {errors.frecuency && 'Frecuency is required'}
            </span>
          </div>

          <div>
            <Controller
              name="remainder_date"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                valueAsDate: true,
              }}
              render={({ field }) => (
                <InputDate
                  placeholder="Pick reminder date"
                  label="Reminder date"
                  field={field}
                />
              )}
            />
            <span className="form-error">
              {errors.remainder_date && 'Pick up a date'}
            </span>
          </div>
          <div>
            <Controller
              name="until_date"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                valueAsDate: true,
              }}
              render={({ field }) => (
                <InputDate
                  placeholder="Pick until date"
                  label="Until date"
                  field={field}
                />
              )}
            />
            <span className="form-error">
              {errors.until_date && 'Pick up a date'}
            </span>
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
