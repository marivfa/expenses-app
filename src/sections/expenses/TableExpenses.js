import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button, LoadingOverlay } from '@mantine/core'
import { FileSpreadsheet, Edit, Trash } from 'tabler-icons-react'
import { toast } from 'react-toastify'
import { InfiniteScroll } from 'react-simple-infinite-scroll'
import { Delete, GetAll } from '../../commons/Api'

import '../../style.css'

export default function TableExpenses() {
  const cols = [
    { header: 'Date Register', field: 'date_register', type: 'text' },
    { header: 'Category', field: 'category', type: 'text' },
    { header: 'Amount', field: 'amount', type: 'text' },
    { header: 'Real Date', field: 'real_date', type: 'text' },
    { header: 'Comment', field: 'comment', type: 'text' },
    { header: 'User', field: 'user', type: 'date' },
    { header: '', field: '', type: '' },
  ]

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cursor, setCursor] = useState(0)
  const [isDelete, setIsDelete] = useState(false)

  const navigate = useNavigate()
  const onEdit = id => {
    navigate(`/expenses/edit/${id}`)
  }

  //BtnDelete
  const onDel = id => {
    Delete(`expenses/${id}`).then(res => {
      if (res) {
        toast.success('Expenses Deleted')
        setItems([])
        setCursor(0)
        setIsDelete(true)
      }
    })
  }

  const loadMore = async () => {
    setIsDelete(false)
    setIsLoading(true)

    const res = await GetAll(`expenses?limit=20&offset=${cursor}`)
    if (res) {
      setItems([...items, ...res.items])
      setCursor(res.offset + 10)
    }
    setIsLoading(false)
  }

  const onExcel = async () => {
    const res = await GetAll(`expenses/xls`)
    if (res) {
      const link = document.createElement('a')
      link.target = '_blank'
      link.href = res.url
      link.click()
    } else {
      toast.error(`${res.error} `)
    }
  }

  useEffect(() => {
    loadMore()
  }, [isDelete])

  useEffect(() => {
    loadMore()
  }, [])

  const rows = items?.map((expenses, index) => {
    return (
      <tr key={index}>
        <td>{expenses.date_register}</td>
        <td>{expenses.category}</td>
        <td>{expenses.amount}</td>
        <td>{expenses.real_date}</td>
        <td>{expenses.comment}</td>
        <td>{expenses.user}</td>
        <td>
          <Button
            leftIcon={<Edit />}
            onClick={() => onEdit(expenses.id)}
            color="blue"
            variant="subtle"
            compact
          ></Button>
          &nbsp;
          <Button
            leftIcon={<Trash />}
            onClick={() => onDel(expenses.id)}
            color="red"
            variant="subtle"
            compact
          ></Button>
        </td>
      </tr>
    )
  })

  const columns = cols.map((column, index) => {
    return <th key={index}>{column.header}</th>
  })

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Expenses</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <LoadingOverlay
            visible={isLoading}
            overlayBlur={2}
            transitionDuration={500}
          />
          <InfiniteScroll
            throttle={64}
            threshold={200}
            isLoading={isLoading}
            hasMore={!!cursor}
            onLoadMore={loadMore}
          >
            <Table striped>
              <thead>
                <tr>
                  {columns}
                  <td></td>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </InfiniteScroll>
        </div>
        {items.length > 0 && (
          <div>
            <hr />
            <h4>No more data to show</h4>
            <Button
              leftIcon={<FileSpreadsheet />}
              onClick={() => onExcel()}
              variant="white"
            >
              Download
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
