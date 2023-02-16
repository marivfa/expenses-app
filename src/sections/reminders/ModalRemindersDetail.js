import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Flex , Modal, ScrollArea, LoadingOverlay} from '@mantine/core'
import { GetAll, Save } from '../../commons/Api'
import CardList from '../../components/CardList'
import '../../style.css'

export default function ModalRemindersDetail({ opened, setOpened, id}) {

  const [reminders, setReminders] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  //Save Reminders
  const onSubmit = async data => {
    const method = id ? 'PUT' : 'POST'
     data.id_user = 0
    if(data.frecuency === 'none'){
      data.until_date = data.remainder_date
    }

    const URL = id ? `remainders/${id}` : 'remainders'
    const res = await Save(URL, method, data)
    if (res) {
      toast.success('Submitted successfully')
      //reset()
      //setOpened(false)
      //await loadMore(0)
    } else {
      toast.error(`Form submit error ${res.error} `)
    }
  }

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
            <CardList data={reminders} />
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