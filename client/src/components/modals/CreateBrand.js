import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'

const CreateBrand = ({show, onHide}) => {
  return (
    <Modal
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить брэнд
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Control placeholder={'Название брэнда'}/>
      </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={onHide}>Добавить</Button>
        <Button variant="danger" onClick={onHide}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateBrand