import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../style.css'
import TableExpenses from './TableExpenses'

export default function MainExpenses() {
  const navigate = useNavigate()
  const onAdd = () => {
    navigate('/expenses/create')
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
      <TableExpenses />
    </div>
  )
}
