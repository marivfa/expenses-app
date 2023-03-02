import { Modal, Button, Flex, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function ModalStep({ opened, setOpened }) {
  const navigate = useNavigate()
  const onAdd = () => {
    navigate('/expenses')
  }

  return (
    <div>
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={true}
        title="First Step"
      >
        <Title ta="center" order={3}>
          Welcome to{' '}
          <Text span c="blue" inherit>
            Finn by me
          </Text>
        </Title>
        <Text ta="center">
          Start managing your spending today by adding your first expense. It's
          quick and easy, you'll be able to stay on top of your expenses and
          make smarter decisions with your money.
        </Text>
        <Text fw={700} c="blue" ta="center">
          Let's get started on your journey towards financial wellness!
        </Text>
        <hr />

        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Button onClick={onAdd}>Create my first expense</Button>
        </Flex>
      </Modal>
    </div>
  )
}
