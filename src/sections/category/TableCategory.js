import { useContext } from 'react'
import { Table, Button, LoadingOverlay, Flex } from '@mantine/core'
import { Edit, Trash } from 'tabler-icons-react'

import { UsersContext } from '../../context/UsersContext'
//import '../../style.css'

export default function TableCategory({ data, isLoading, onEdit, onDel }) {
  const [currentUser] = useContext(UsersContext)
  const cols = [
    { header: 'Description', field: 'description', type: 'text' },
    { header: 'Type', field: 'type', type: 'text' },
    {
      header: `Budget (${currentUser && currentUser.currency})`,
      field: 'type',
      type: 'text',
    },
    { header: 'User', field: 'name_user', type: 'text' },
    { header: '', field: '', type: '' },
  ]

  const rows = data?.map((category, index) => {
    return (
      <tr key={index}>
        <td>{category.description}</td>
        <td>{category.type}</td>
        <td>{category.budget}</td>
        <td>{category.name_user}</td>
        <td>
          {currentUser &&
            category.id_user > 0 &&
            ((currentUser.type === 'delegate' &&
              currentUser.id === category.id_user) ||
              currentUser.type === 'admin') && (
              <Flex
                mih={50}
                gap="xs"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <Button
                  leftIcon={<Edit />}
                  onClick={() => onEdit(category.id)}
                  color="blue"
                  variant="subtle"
                  compact
                ></Button>
                <Button
                  leftIcon={<Trash />}
                  onClick={() => onDel(category.id)}
                  color="red"
                  variant="subtle"
                  compact
                ></Button>
              </Flex>
            )}
        </td>
      </tr>
    )
  })

  const columns = cols.map((column, index) => {
    return <th key={column.field}>{column.header}</th>
  })

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Category</h6>
        </div>
        <div className="card-body">
          <LoadingOverlay
            visible={isLoading}
            overlayBlur={2}
            transitionDuration={500}
          />
          <Table striped>
            <thead>
              <tr>{columns}</tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </div>
      </div>
    </>
  )
}
