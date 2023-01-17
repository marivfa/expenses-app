import React, { useEffect, useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import { GetAll } from '../commons/Api'

export default function CardList() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    asyncFetch()
  }, [])

  const asyncFetch = () => {
    setIsLoading(true)
    GetAll(`dashboard/by_category`).then(
      res => {
        let arrTMP = []
        Object.entries(res).forEach(([key, value]) => {
          let obj = {
            category: key,
            amount: value,
          }
          arrTMP.push(obj)
        })

        setData(arrTMP)

        setIsLoading(false)
      },
      error => {
        setIsLoading(false)
      }
    )
  }

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
      <ListGroup as="ol">{listItem}</ListGroup>
    </div>
  )
}
