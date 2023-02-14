import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Flex , Modal} from '@mantine/core'
import { GetAll, Save } from '../../commons/Api'
import '../../style.css'

export default function FormCategory({ opened, setOpened, getDataCat , id}) {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm()

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
  
  const onCancel = () => {
      reset()
      setOpened(false)
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
          <div className="row form-group">
            <div className="col-sm-12">
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
           </div> 
           <div className="row form-group">
            <div className="col-sm-12">
              <label>Type</label>
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
    </Modal>
  )
}
