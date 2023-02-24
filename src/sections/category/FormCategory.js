import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Flex, Modal, SimpleGrid } from '@mantine/core'
import { useForm, Controller } from 'react-hook-form'
import { GetAll, Save } from '../../commons/Api'
import { InputText, InputSelect } from '../../components/Inputs'
import '../../style.css'

export default function FormCategory({ opened, setOpened, getDataCat, id }) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: '',
      type: '',
    },
  })

  //Save Category
  const onSubmit = async data => {
    setIsLoading(true)
    const method = id ? 'PUT' : 'POST'
    const URL = id ? `category/${id}` : 'category'
    data.id_user = 0
    const res = await Save(URL, method, data)
    if (res) {
      toast.success('Submitted successfully')
      reset()
      await getDataCat()
      setOpened(false)
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
    if (id > 0) {
      getCategory()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Modal
      centered
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={true}
      title={id === 0 ? 'Add Category' : 'Edit Category'}
    >
      <form className="user" onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid cols={1} spacing="xs" verticalSpacing="xs">
          <div>
            <Controller
              name="type"
              control={control}
              rules={{
                required: {
                  value: true,
                },
                validate: value => value !== '',
              }}
              render={({ field }) => (
                <InputSelect
                  label="Select type"
                  placeholder="Pick one"
                  data={[
                    { value: 'fixed', label: 'Fixed' },
                    { value: 'flex', label: 'Flex' },
                    { value: 'other', label: 'Other' },
                  ]}
                  field={field}
                />
              )}
            />
            <span className="form-error">
              {errors.type && 'Type is required'}
            </span>
          </div>
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
