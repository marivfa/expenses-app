import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../style.css'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Delete, GetAll } from '../../commons/Api'
import { toast } from 'react-toastify'

import { InfiniteScroll } from 'react-simple-infinite-scroll'

const fontInfo = <FontAwesomeIcon icon={faInfoCircle} />
const fontDel = <FontAwesomeIcon icon={faTrash} />

export default function TableExpenses() {
  const cols = [
    { header: 'Date Register', field: 'date_register', type: 'text' },
    { header: 'Category', field: 'category', type: 'text' },
    { header: 'Amount', field: 'amount', type: 'text' },
    { header: 'Real Date', field: 'real_date', type: 'text' },
    { header: 'Comment', field: 'comment', type: 'text' },
    { header: 'User', field: 'user', type: 'date' },
  ]

  const initParams = {
    date_register: '',
    category: '',
    amount: '',
    user: '',
  }

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cursor, setCursor] = useState(0)
  const [error, setError] = useState()
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

  const loadMore = () => {
    setIsDelete(false)
    setIsLoading(true)
    setError(undefined)

    GetAll(`expenses?limit=20&offset=${cursor}`).then(
      res => {
        setItems([...items, ...res.items])
        setCursor(res.offset + 10)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
        setError(error)
      }
    )
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
          <button
            title="Edit"
            className="btn btn-primary btn-circle btn-sm"
            onClick={() => onEdit(expenses.id)}
          >
            {fontInfo}
          </button>
          &nbsp;
          <button
            title="Delete"
            className="btn btn-danger btn-circle btn-sm"
            onClick={() => onDel(expenses.id)}
          >
            {fontDel}
          </button>
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
          <InfiniteScroll
            throttle={64}
            threshold={200}
            isLoading={isLoading}
            hasMore={!!cursor}
            onLoadMore={loadMore}
          >
            <table className="table table-bordered">
              <thead>
                <tr>
                  {columns}
                  <td></td>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </InfiniteScroll>
        </div>
        {items.length > 0 && <h4>No more data to show</h4>}
      </div>
    </div>
  )
}
