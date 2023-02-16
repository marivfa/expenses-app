import ListGroup from 'react-bootstrap/ListGroup'
import { Card, Text, Badge, Group, Space } from '@mantine/core';

export default function CardList({ data }) {
  
  const listItem = data?.map((data, index) => {
    return (
      <div key={data.detail_id}>
      <Card p="xs" radius="md" withBorder >
        <Group position="apart">
          <Text weight={500}>{data.description}</Text>
          <Badge color={`${data.status === 'pending' ? 'pink' : 'green'}`} variant="light">
            {data.status}
          </Badge>
        </Group>
        <Text size="xs" color="dimmed" ta="left">
          {data.date_time}
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
