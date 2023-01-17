import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../style.css'
import TableCategory from './TableCategory'

export default function MainCategory() {
  const navigate = useNavigate()
  const onAdd = () => {
    navigate('/category/create')
  }

  return (
    <div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary me-md-2"
          type="button"
          onClick={onAdd}
        >
          New
        </button>
      </div>
      <hr />
      <TableCategory />
    </div>
  )
}
