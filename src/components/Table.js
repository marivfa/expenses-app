import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style.css'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
//import ModalForm from './ModalForm'
import { Delete, GetAll } from '../commons/Api'
import { toast } from 'react-toastify'

import { InfiniteScroll } from 'react-simple-infinite-scroll'

const fontInfo = <FontAwesomeIcon icon={faInfoCircle} />
const fontDel = <FontAwesomeIcon icon={faTrash} />
//const fontAvailable = <FontAwesomeIcon icon={faCheckCircle} />
//const fontNonAvailable = <FontAwesomeIcon icon={faCircleMinus} />

export default function Table() {
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

  //const [modalShow, setModalShow] = useState(false)
  //const [objExpenses, setObjExpenses] = useState([])

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

  useEffect(() => {
    loadMore()
  }, [isDelete])

  //Modal
  /*const handleShow = expenses => {
    setModalShow(true)
    setObjExpenses(expenses)
  }

  const handleClose = () => {
    setObjExpenses([])
    setModalShow(false)
    getData()
  }*/

  //Pagination
  /*const handleClick = url => {
    GetAll('expenses', url).then(res => {
      if (res) {
        setData(res)
      }
    })
  }*/
  //Filters
  /*const handleChange = event => {
    const { name, value } = event.target
    setParams(prevFormData => {
      return {
        ...prevFormData,
        [name]: value,
      }
    })
  }*/

  /*useEffect(() => {
    let queryString = Object.keys(params)
      .map(key => (params[key] ? key + '=' + params[key] : ''))
      .join('&')

    GetAll(`expenses?${queryString}`).then(res => {
      if (res) {
        setData(res)
      }
    })
  }, [params])*/

  /*const getData = (setData, data) => {
    console.log('here')
    return GetAll(`expenses?limit=${limit}&offset=${offset}`).then(res => {
      if (res) {
        total = res.total
        setOffset(res.offset + limit)
        //let tmp = data
        //tmp.push(res.items)
        //setData(data => [...data, ...res.items])
        setData([...data, ...res.items])
        console.log(data)
        //setData(data.apply(res.items))
      }
    })
  }*/

  useEffect(() => {
    loadMore()
  }, [])

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

  /*const columnsFilter = cols.map((column, index) => {
    return (
      <td key={column.field}>
        <input
          type={column.type}
          className="form-control"
          name={column.field}
          onKeyUp={handleChange}
        />
      </td>
    )
  })*/

  /*const pagination = data?.links?.map((link, index) => {
    return (
      <Pagination.Item
        key={index}
        active={link.active}
        onClick={() => handleClick(link.url)}
      >
        {index === 0
          ? 'Previous'
          : index === data.links.length - 1
          ? 'Next'
          : link.label}
      </Pagination.Item>
    )
  })*/

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

/**
 * {modalShow}{' '}
      <ModalForm
        show={modalShow}
        handleClose={handleClose}
        objExpenses={objExpenses}
      />
 
 <button
            title={expenses.status === 'active' ? 'Available' : 'Non available'}
            className={`btn btn-circle btn-sm ${
              expenses.status === 'active' ? 'btn-success' : 'btn-warning'
            }`}
            onClick={() => handleShow(expenses)}
          >
            {expenses.status === 'active' ? fontAvailable : fontNonAvailable}
          </button>
          &nbsp;
      */
