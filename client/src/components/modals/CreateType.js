import React, { useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { createType } from '../../api/deviceApi'

const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const addType = () => {
    if(value.length > 0){
        createType(value).then(data => {
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
        Добавить тип
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Control value={value} required
         onChange={(e) => setValue(e.target.value)} placeholder={'Название типа'}/>
      </Form>

      <Alert className='mt-2 d-flex' show={showAlert} variant="success">
        <Alert.Heading>Тип добавлен.</Alert.Heading>
      </Alert>

      <Alert className='mt-2 d-flex' show={showErrorAlert} variant="danger">
        <Alert.Heading>Введите название типа.</Alert.Heading>
      </Alert>

    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={addType}>Добавить</Button>
        <Button variant="outline-danger" onClick={() => hideClear()}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateType