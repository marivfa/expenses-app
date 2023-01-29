import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Button} from '@mantine/core';
import { Edit, Trash } from 'tabler-icons-react';
import { Delete, GetAll } from '../../commons/Api'
import { toast } from 'react-toastify'
import '../../style.css'


export default function TableCategory() {
  const cols = [
    { header: 'Description', field: 'description', type: 'text' },
    { header: 'Type', field: 'type', type: 'text' },
    { header: '', field: '', type: '' },
  ]

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const onEdit = id => {
    navigate(`/category/edit/${id}`)
  }

  //BtnDelete
  const onDel = async id => {
    setIsLoading(true)
    const res = await Delete(`category/${id}`)
    if (res) {
      toast.success('Category Deleted')
      getDataCat()
    }
    setIsLoading(false)
  }

  const getDataCat = async () => {
    setIsLoading(true)
    const res = await GetAll(`category`)
    if (res) {
      setData(res)
    }
    setIsLoading(false)
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
          <Button leftIcon={<Edit/>} onClick={() => onEdit(category.id)} color="blue" variant='subtle' compact></Button>
          &nbsp;
          <Button leftIcon={<Trash/>} onClick={() => onDel(category.id)} color="red" variant='subtle' compact></Button>
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
          <Table striped>
            <thead>
              <tr>
                {columns}
                <td></td>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}
