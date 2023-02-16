import { useEffect, useState } from 'react'
import { Button} from '@mantine/core';
import { SquarePlus} from 'tabler-icons-react';
import { toast } from 'react-toastify'
import { Delete, GetAll } from '../../commons/Api'
import TableReminders from './TableReminders'
import FormReminders from './FormReminders';
import '../../style.css'
import ModalRemindersDetail from './ModalRemindersDetail';

export default function MainReminders() {
  const [opened, setOpened] = useState(false)
  const [openedDet, setOpenedDet] = useState(false)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDelete, setIsDelete] = useState(false)
  const [cursor, setCursor] = useState(0)
  const [id, setId] = useState(0)

  const onEdit = id => {
    setId(id)
    setOpened(true)
  }

  //BtnDelete
  const onDel = async id => {
    const res = await Delete(`remainders/${id}`)
    if (res) {
      toast.success('Reminders Deleted')
      setItems([])
      setCursor(0)
      setIsDelete(true)
    }
  }

  const loadMore = (newCursor) => {
    setIsDelete(false)
    setIsLoading(true)

    GetAll(`remainders?limit=20&offset=${newCursor !== undefined ? newCursor : cursor}`).then(
      res => {
        if(newCursor !== undefined){
          setItems(res.items)
        }else{
          setItems([...items, ...res.items])
        }
        setCursor(res.offset + 10)
        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }

  const onDet = async id => {
    setId(id)
    setOpenedDet(true)
  }

  useEffect(() => {
    loadMore()
  }, [isDelete])

  useEffect(() => {
    loadMore()
  }, [])

  return (
    <div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
      <Button leftIcon={<SquarePlus/>} onClick={() => {setOpened(true); setId(0)}}>
            New
        </Button>
      </div>
      <hr />
      <TableReminders items={items} isLoading={isLoading} cursor={cursor} loadMore={loadMore} onDel={onDel} onEdit={onEdit} onDet={onDet}/>
      <FormReminders opened={opened} setOpened={setOpened} loadMore={loadMore} id={id}/>
      <ModalRemindersDetail opened={openedDet} setOpened={setOpenedDet} id={id}/>
    </div>
  )
}
