import { useContext } from 'react'
import { Table, Button ,LoadingOverlay, Flex} from '@mantine/core'
import { Edit, Trash , FileInfo} from 'tabler-icons-react'
import { InfiniteScroll } from 'react-simple-infinite-scroll'
import { UsersContext } from '../../context/UsersContext'
import '../../style.css'


export default function TableReminders({items, isLoading, cursor, loadMore, onDel, onEdit, onDet, infiniteScrollRef}) {
  const cols = [
    { header: 'Date Register', field: 'date_register', type: 'date' },
    { header: 'Description', field: 'description', type: 'text' },
    { header: 'Frecuency', field: 'frecuency', type: 'text' },
    { header: 'Reminder Date', field: 'remainder_date', type: 'text' },
    { header: '', field: '', type: '' },
  ]

  const [currentUser] = useContext(UsersContext)

  const rows = items?.map((detail, index) => {
    return (
      <tr key={index}>
        <td>{detail.date_register}</td>
        <td>{detail.description}</td>
        <td>{detail.frecuency}</td>
        <td>{detail.until_date}</td>
        <td>
          {currentUser &&
            ((currentUser.type === 'delegate' &&
              currentUser.id === detail.id_user) ||
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
                  leftIcon={<FileInfo />}
                  onClick={() => onDet(detail.id)}
                  color="indigo"
                  variant="subtle"
                  compact
                ></Button>
                <Button
                  leftIcon={<Edit />}
                  onClick={() => onEdit(detail.id)}
                  color="blue"
                  variant="subtle"
                  compact
                ></Button>
                <Button
                  leftIcon={<Trash />}
                  onClick={() => onDel(detail.id)}
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
        <h6 className="m-0 font-weight-bold text-primary">Reminders</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
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
        </div>
        {items.length === 0 && <div><hr /><h4>No data to show</h4></div>}
      </div>
    </div>
  )
}
