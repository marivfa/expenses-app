import { useEffect, useState } from 'react'
import { Button } from '@mantine/core'
import { SquarePlus } from 'tabler-icons-react'
import { toast } from 'react-toastify'

import { GetAll, Delete } from '../../commons/Api'
import TableCategory from './TableCategory'
import FormCategory from './FormCategory'
import '../../style.css'

export default function MainCategory() {
  const [opened, setOpened] = useState(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [id, setId] = useState(0)

  const getDataCat = async () => {
    setIsLoading(true)
    const res = await GetAll(`category`)
    if (res) {
      setData(res)
    }
    setIsLoading(false)
  }

  const onEdit = id => {
    setId(id)
    setOpened(true)
  }

  //BtnDelete
  const onDel = async id => {
    setIsLoading(true)
    const res = await Delete(`category/${id}`)
    if (res) {
      toast.success('Category Deleted')
      await getDataCat()
    }
    setIsLoading(false)
  }

  //Initial Data
  useEffect(() => {
    getDataCat()
  }, [])

  return (
    <>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Button
          leftIcon={<SquarePlus />}
          onClick={() => {
            setOpened(true)
            setId(0)
          }}
        >
          New
        </Button>
      </div>
      <hr />
      <TableCategory
        data={data}
        isLoading={isLoading}
        onEdit={onEdit}
        onDel={onDel}
      />
      <FormCategory
        opened={opened}
        setOpened={setOpened}
        getDataCat={getDataCat}
        id={id}
      />
    </>
  )
}
