import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import ListGroup from 'react-bootstrap/ListGroup'
import { Card, Text, Group, Space, Switch } from '@mantine/core'
import { Save } from '../commons/Api'

export default function CardList({ data }) {
  /*const [items, setItems] = useState(
    data.map((item) => ({
      ...item,
      checked: (item.status === 'pending' ? false : true) || false,
    }))
  );*/
  const [items, setItems] = useState(null)

  const saveChecked = async (e, id) => {
    if (e.currentTarget) {
      const isChecked = e.currentTarget.checked
      setItems(prevItems =>
        prevItems.map(item =>
          item.detail_id === id ? { ...item, checked: isChecked } : item
        )
      )
    }

    const URL = `remainders/detail/${id}`
    const detail = {
      status: e.currentTarget.checked ? 'check' : 'pending',
    }
    const res = await Save(URL, 'PUT', detail)
    if (res) {
      toast.success('Submitted successfully')
    } else {
      toast.error(`Submit error ${res.error} `)
    }
  }

  useEffect(() => {
    // Load items from props
    setItems(
      data.map(item => ({
        ...item,
        checked: (item.status === 'pending' ? false : true) || false,
      }))
    )
  }, [data])

  useEffect(() => {
    return () => {
      // Cancel all asynchronous tasks and subscriptions here
    }
  }, [])

  const listItem = items?.map((item, index) => {
    return (
      <div key={item.detail_id}>
        <Card p="xs" radius="md" withBorder>
          <Group position="apart">
            <Text weight={500}>{item.description}</Text>
            <Switch
              color="green"
              size="md"
              onLabel="check"
              offLabel="pending"
              onChange={event => saveChecked(event, item.detail_id)}
              checked={item.checked}
            />
          </Group>
          <Text size="xs" color="dimmed" ta="left">
            {item.date_time}
          </Text>
        </Card>
        <Space h="xs" />
      </div>
    )
  })

  return (
    <div>
      {data.length > 0 ? (
        <ListGroup as="ol">{listItem}</ListGroup>
      ) : (
        <Text ta="center">No reminders to show</Text>
      )}
    </div>
  )
}

/*
<Badge color={`${data.status === 'pending' ? 'pink' : 'green'}`} variant="light">
            {data.status}
          </Badge>
          */
