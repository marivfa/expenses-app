import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button, Avatar, Flex } from '@mantine/core'
import { UserPlus } from 'tabler-icons-react'
import { Storage } from 'aws-amplify'

import { GetAll, Save } from '../../commons/Api'

import countries from '../../data/countries.json'
import ModalChangePass from '../../components/ModalChangePass'
import '../../style.css'
import ModalDelegate from './ModalDelegate'

export default function UsersProfile() {
  const [isLoading, setIsLoading] = useState(true)
  const [opened, setOpened] = useState(false)
  const [openedDelegate, setOpenedDelegate] = useState(false)
  const [emailUser, setEmailUser] = useState('')
  const [imageExist, setImageExist] = useState(null)
  const [error, setError] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const imgDefaultd = '../img/undraw_profile.svg'

  const navigate = useNavigate()

  const onCancel = () => {
    navigate('/dashboard')
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm()

  const onSubmit = async data => {
    setIsLoading(true)
    const res = await Save(`users/me`, 'PUT', data)
    if (res) {
      toast.success('Submitted successfully')
    } else {
      toast.error(`Form submit error ${res.error} `)
    }
    setIsLoading(false)
  }

  const getUser = async () => {
    setIsLoading(true)
    const res = await GetAll(`users/me`)
    if (res) {
      Object.entries(res).forEach(([key, value]) => {
        setValue(key, value)
        if (key === 'email') {
          setEmailUser(value)
        }
      })
    }
    setIsLoading(false)
  }

  const uploadPhoto = async e => {
    const file = e.target.files[0]
    const new_file = new File([file], emailUser, { type: file.type })
    setIsLoading(true)
    try {
      const res = await Storage.put(new_file.name, new_file, {
        contentType: 'image/png', // contentType is optional
      })
      if (res) {
        console.log(res)
        setImageExist(true)
      }
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
    setIsLoading(false)
  }

  const checkImageExist = async () => {
    if (!emailUser) return
    const resp = await Storage.get(emailUser, {
      level: 'public',
      download: true,
      contentType: ' "image/png"',
    })
    let image = new Image()
    image.src = URL.createObjectURL(resp.Body)
    setImageUrl(image.src)
  }

  //Initial Data
  useEffect(() => {
    const fetchData = async () => {
      // get the data from the api
      await getUser()
    }
    fetchData()
    //
  }, [])

  useEffect(() => {
    checkImageExist()
    //
  }, [emailUser])

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
        <Button leftIcon={<UserPlus />} onClick={() => setOpenedDelegate(true)}>
          Delegate
        </Button>
      </div>
      <hr />
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">My account</h6>
        </div>
        <div className="card-body">
          <div className="row form-group">
            <div className="col-sm-1">
              <Avatar
                radius="xl"
                size="xl"
                src={imageUrl ? imageUrl : imgDefaultd}
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
                onChange={uploadPhoto}
              />
            </div>
          </div>
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register('name', { required: true, disabled: true })}
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
                <a
                  className="small"
                  href="/"
                  role="button"
                  onClick={() => setOpened(true)}
                >
                  Change Password
                </a>
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
      <ModalChangePass opened={opened} setOpened={setOpened} />
      <ModalDelegate
        opened={openedDelegate}
        setOpened={setOpenedDelegate}
        country={getValues('country')}
        currency={getValues('currency')}
      />
    </div>
  )
}
