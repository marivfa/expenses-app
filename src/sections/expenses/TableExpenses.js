import { useContext} from 'react'
import { Table, Button, LoadingOverlay, Flex } from '@mantine/core'
import { FileSpreadsheet, Edit, Trash } from 'tabler-icons-react'
import { InfiniteScroll } from 'react-simple-infinite-scroll'
import { UsersContext } from '../../context/UsersContext'
 
import '../../style.css'

export default function TableExpenses({items, isLoading, cursor, loadMore, onDel, onExcel, onEdit, infiniteScrollRef}) {
  
  const [currentUser] = useContext(UsersContext)

  const cols = [
    { header: 'Date Register', field: 'date_register', type: 'text' },
    { header: 'Category', field: 'category', type: 'text' },
    { header: `Amount (${currentUser && currentUser.currency})`, field: 'amount', type: 'text' },
    { header: 'Real Date', field: 'real_date', type: 'text' },
    { header: 'Comment', field: 'comment', type: 'text' },
    { header: 'User', field: 'user', type: 'date' },
    { header: '', field: '', type: '' },
  ]
  
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
          {currentUser &&
            ((currentUser.type === 'delegate' &&
              currentUser.id === expenses.id_user) ||
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
                  onClick={() => onEdit(expenses.id)}
                  color="blue"
                  variant="subtle"
                  compact
                ></Button>
                <Button
                  leftIcon={<Trash />}
                  onClick={() => onDel(expenses.id)}
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
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">Expenses</h6>
      </div>
      <div className="card-body">
          <LoadingOverlay
            visible={isLoading}
            overlayBlur={2}
            transitionDuration={500}
          />
          <InfiniteScroll
            throttle={64}
            threshold={200}
            isLoading={isLoading}
            hasMore={!!cursor}
            onLoadMore={loadMore}
            ref={infiniteScrollRef}
          >
            <Table striped>
              <thead>
                <tr>
                  {columns}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </InfiniteScroll>
          {items.length === 0 && (
            <div>
              <hr />
              <h4>No data to show</h4>
            </div>
          )}
          {items.length > 0 && (
            <div>
              <Button
                leftIcon={<FileSpreadsheet />}
                onClick={() => onExcel()}
                variant="white"
              >
                Download
              </Button>
            </div>
          )}
      </div>
    </div>
  )
}
