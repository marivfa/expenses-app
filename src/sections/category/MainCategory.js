import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button} from '@mantine/core';
import { SquarePlus} from 'tabler-icons-react';
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
        <Button leftIcon={<SquarePlus/>} onClick={onAdd}>
            New
        </Button>
      </div>
      <hr />
      <TableCategory />
    </div>
  )
}
