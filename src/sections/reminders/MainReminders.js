import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button} from '@mantine/core';
import { SquarePlus} from 'tabler-icons-react';
import '../../style.css'

import TableReminders from './TableReminders'

export default function MainReminders() {
  const navigate = useNavigate()
  const onAdd = () => {
    navigate('/reminders/create')
  }

  return (
    <div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Button leftIcon={<SquarePlus/>} onClick={onAdd}>
            New
        </Button>
      </div>
      <hr />
      <TableReminders />
    </div>
  )
}
