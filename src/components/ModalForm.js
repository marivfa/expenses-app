import { useForm } from 'react-hook-form'
import { Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Save } from '../commons/Api'

export default function ModalForm({ show, handleClose, objBook }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm()

  const onSubmit = data => {
    if (objBook.status) {
      let status = objBook.status === 'active' ? 'inactive' : 'active'
      setValue('status', status, {})
    }

    Save(`book/${objBook.id}`, 'PUT', getValues()).then(res => {
      if (res) {
        handleClose()
        toast.success('Submitted successfully')
      } else {
        toast.error(`Form submit error ${res.error} `)
      }
    })
  }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {objBook.status === 'active' ? 'Borrow' : 'Return'} Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="user" onSubmit={handleSubmit(onSubmit)}>
            {objBook.status === 'active' && (
              <div className="row form-group">
                <div className="col-sm-6">
                  <label htmlFor="name">Borrow Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    {...register('name', { required: true })}
                  />
                  <span className="form-error">
                    {errors.name && 'Name is required'}
                  </span>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="return_date">Return Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="return_date"
                    placeholder="Return Date"
                    {...register('return_date', { required: true })}
                  />
                  <span className="form-error">
                    {errors.return_date && 'Date is required'}
                  </span>
                </div>
              </div>
            )}
            <div className="row form-group">
              <div className="offset-sm-5 col-sm-2">
                <button className="btn btn-primary btn-user btn-block">
                  {objBook.status === 'active' ? 'Borrow' : 'Return'} Book
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
