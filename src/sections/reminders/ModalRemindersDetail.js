import { useEffect, useState } from 'react'
import { Button, Flex , Modal, ScrollArea, LoadingOverlay} from '@mantine/core'
import { GetAll } from '../../commons/Api'
import CardList from '../../components/CardList'
import '../../style.css'

export default function ModalRemindersDetail({ opened, setOpened, id}) {
  const [reminders, setReminders] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getRemindersDet = async () => {
    setIsLoading(true)
    const res = await GetAll(`remainders/detail/${id}`)
    if (res.status) {
      setReminders(res.data)
    }
    setIsLoading(false)
  }

   //Get Detail
    useEffect(() => {
    if (id > 0) {
        getRemindersDet()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={true}
        title="Detail Remainder"
      >
        <form className="user">
            <ScrollArea style={{ height: 350 }}>
            <LoadingOverlay
                visible={isLoading}
                overlayBlur={2}
                transitionDuration={500}
            />
            <CardList data={reminders}/>
            </ScrollArea>
          <hr />
          <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button onClick={() => setOpened(false)} color="red">
              Close
            </Button>
          </Flex>
        </form>
      </Modal>
  )
}