import { useEffect, useState, useRef } from 'react'
import { Button } from '@mantine/core'
import { SquarePlus } from 'tabler-icons-react'
import { toast } from 'react-toastify'
import { Storage } from 'aws-amplify'
import { Delete, GetAll } from '../../commons/Api'
import TableExpenses from './TableExpenses'
import FormExpenses from './FormExpenses'
import '../../style.css'

export default function MainExpenses() {
  const [opened, setOpened] = useState(false)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDelete, setIsDelete] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [id, setId] = useState(0)
  const infiniteScrollRef = useRef(null)

  const onEdit = id => {
    setId(id)
    setOpened(true)
  }

  //BtnDelete
  const onDel = async id => {
    const res = await Delete(`expenses/${id}`)
    if (res) {
      toast.success('Expenses Deleted')
      setItems([])
      setCursor(0)
      setIsDelete(true)
    }
  }

  const loadMore = async newCursor => {
    setIsDelete(false)
    setIsLoading(true)

    const res = await GetAll(
      `expenses?limit=20&offset=${newCursor !== undefined ? newCursor : cursor}`
    )
    if (res) {
      if (newCursor !== undefined) {
        setItems(res.items)
      } else {
        setItems([...items, ...res.items])
      }

      setCursor(res.offset + 10)
    }
    setIsLoading(false)
  }

  const getFileExcel = async url => {
    setIsLoading(true)
    try {
      const res = await Storage.get(`${url}`, {
        level: 'public',
        download: true,
      })
      if (res) {
        const blob = new Blob([res.Body], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.target = '_blank'
        link.href = url
        link.download = 'data.csv'
        link.click()
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
    setIsLoading(false)
  }

  const onExcel = async () => {
    const res = await GetAll(`expenses/xls`)
    if (res) {
      getFileExcel(res.url)
    } else {
      toast.error(`${res.error} `)
    }
  }

  useEffect(() => {
    loadMore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete])

  /*useEffect(() => {
    loadMore()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])*/

  useEffect(() => {
    if (infiniteScrollRef.current) {
      return () => {
        infiniteScrollRef.current = null
      }
    }
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
      <TableExpenses
        items={items}
        isLoading={isLoading}
        cursor={cursor}
        loadMore={loadMore}
        onDel={onDel}
        onExcel={onExcel}
        onEdit={onEdit}
        infiniteScrollRef={infiniteScrollRef}
      />
      <FormExpenses
        opened={opened}
        setOpened={setOpened}
        loadMore={loadMore}
        id={id}
      />
    </>
  )
}
