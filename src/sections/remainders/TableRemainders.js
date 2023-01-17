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

export default function TableRemainders() {
  const cols = [
    { header: 'Date Register', field: 'date_register', type: 'date' },
    { header: 'Description', field: 'description', type: 'text' },
    { header: 'Frecuency', field: 'frecuency', type: 'text' },
    { header: 'Remainder Date', field: 'remainder_date', type: 'text' },
    { header: 'Until Date', field: 'until_date', type: 'date' },
  ]

  const initParams = {
    date_register: '',
    category: '',
    description: '',
    frecuency: '',
    until_date: '',
    remainder_date: '',
    user: '',
  }

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [cursor, setCursor] = useState(0)
  const [error, setError] = useState()
  const [isDelete, setIsDelete] = useState(false)

  const navigate = useNavigate()
  const onEdit = id => {
    navigate(`/remainders/edit/${id}`)
  }

  //BtnDelete
  const onDel = id => {
    Delete(`remainders/${id}`).then(res => {
      if (res) {
        toast.success('Remainders Deleted')
        setItems([])
        setCursor(0)
        setIsDelete(true)
      }
    })
  }

  useEffect(() => {
    loadMore()
  }, [isDelete])

  useEffect(() => {
    loadMore()
  }, [])

  const loadMore = () => {
    setIsDelete(false)
    setIsLoading(true)
    setError(undefined)

    GetAll(`remainders?limit=20&offset=${cursor}`).then(
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

  const rows = items?.map((remainders, index) => {
    return (
      <tr key={index}>
        <td>{remainders.date_register}</td>
        <td>{remainders.description}</td>
        <td>{remainders.frecuency}</td>
        <td>{remainders.until_date}</td>
        <td>
          <button
            title="Edit"
            className="btn btn-primary btn-circle btn-sm"
            onClick={() => onEdit(remainders.id)}
          >
            {fontInfo}
          </button>
          &nbsp;
          <button
            title="Delete"
            className="btn btn-danger btn-circle btn-sm"
            onClick={() => onDel(remainders.id)}
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
        <h6 className="m-0 font-weight-bold text-primary">Remainders</h6>
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
