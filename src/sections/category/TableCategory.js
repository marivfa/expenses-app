import { useEffect, useState, useContext } from 'react'
import { Table, Button, LoadingOverlay, Flex } from '@mantine/core'
import { Edit, Trash } from 'tabler-icons-react'

import { UsersContext } from '../../context/UsersContext'
import '../../style.css'

export default function TableCategory({data, isLoading, onEdit, onDel}) {
  const cols = [
    { header: 'Description', field: 'description', type: 'text' },
    { header: 'Type', field: 'type', type: 'text' },
    { header: '', field: '', type: '' },
  ]
  
  const [currentUser] = useContext(UsersContext)

  const rows = data?.map((category, index) => {
    return (
      <tr key={index}>
        <td>{category.description}</td>
        <td>{category.type}</td>
        <td>
          {currentUser &&
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
    return <th key={index}>{column.header}</th>
  })

  return (
    <>
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Category</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <LoadingOverlay
            visible={isLoading}
            overlayBlur={2}
            transitionDuration={500}
          />
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
    </>
  )
}
