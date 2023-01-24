import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'

export default function CardList({ data }) {
  const listItem = data?.map((data, index) => {
    return (
      <ListGroup.Item
        key={index}
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Description</div>
          Date
        </div>
        <Badge bg="primary" pill>
          State
        </Badge>
      </ListGroup.Item>
    )
  })

  return (
    <div>
      {data.length > 0 ? (
        <ListGroup as="ol">{listItem}</ListGroup>
      ) : (
        <h5>No remainders to show</h5>
      )}
    </div>
  )
}
