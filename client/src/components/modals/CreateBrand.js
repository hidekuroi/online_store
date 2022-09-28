import React, { useState } from 'react'
import { Modal, Button, Form, Alert, Row } from 'react-bootstrap'
import { createBrand } from '../../api/deviceApi'

const CreateBrand = ({show, onHide}) => {
  const [value, setValue] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const addBrand = () => {
    if(value.length > 0) {
      createBrand(value).then(data => {
        setValue('')
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 1500);
      }) 
    }else {
      setShowErrorAlert(true)

      setTimeout(() => {
        setShowErrorAlert(false)
      }, 1500);
    }
  }

  const hideClear = () => {
    onHide()
    setShowAlert(false)
    setShowErrorAlert(false)
  }

  return (
    <Modal
    show={show}
    onHide={() => hideClear()}
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
        <Form.Control onChange={(e) => {setValue(e.target.value)}}
        value={value} required placeholder={'Название брэнда'}/>
      </Form>

      <Alert className='mt-2 d-flex' show={showAlert} variant="success">
        <Alert.Heading>Брэнд добавлен.</Alert.Heading>
      </Alert>

      <Alert className='mt-2 d-flex' show={showErrorAlert} variant="danger">
        <Alert.Heading>Введите название бренда.</Alert.Heading>
      </Alert>

    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={addBrand}>Добавить</Button>
        <Button variant="danger" onClick={() => hideClear()}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateBrand