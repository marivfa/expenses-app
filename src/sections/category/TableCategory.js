import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../style.css'
import { faInfoCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Delete, GetAll } from '../../commons/Api'
import { toast } from 'react-toastify'

const fontInfo = <FontAwesomeIcon icon={faInfoCircle} />
const fontDel = <FontAwesomeIcon icon={faTrash} />

export default function TableCategory() {
  const cols = [
    { header: 'Description', field: 'description', type: 'text' },
    { header: 'Type', field: 'type', type: 'text' },
  ]

  const [data, setData] = useState([])

  const navigate = useNavigate()
  const onEdit = id => {
    navigate(`/category/edit/${id}`)
  }

  //BtnDelete
  const onDel = id => {
    Delete(`category/${id}`).then(res => {
      if (res) {
        toast.success('Category Deleted')
        getDataCat()
      }
    })
  }

  const getDataCat = () => {
    GetAll('category').then(res => {
      if (res) {
        setData(res)
      }
    })
  }

  //Initial Data
  useEffect(() => {
    getDataCat()
  }, [])

  const rows = data?.map((category, index) => {
    return (
      <tr key={index}>
        <td>{category.description}</td>
        <td>{category.type}</td>
        <td>
          &nbsp;
          <button
            title="Edit"
            className="btn btn-primary btn-circle btn-sm"
            onClick={() => onEdit(category.id)}
          >
            {fontInfo}
          </button>
          &nbsp;
          <button
            title="Delete"
            className="btn btn-danger btn-circle btn-sm"
            onClick={() => onDel(category.id)}
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
        <h6 className="m-0 font-weight-bold text-primary">Category</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table
            className="table table-bordered"
            id="dataTable"
            width="100%"
            cellSpacing="0"
          >
            <thead>
              <tr>
                {columns}
                <td></td>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
