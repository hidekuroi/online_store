import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Modal, Button, Form, Alert, Dropdown } from 'react-bootstrap'
import { deleteType, fetchTypes } from '../../api/deviceApi'
import { Context } from '../../index'

const DeleteType = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const onDeleteType = () => {
    if(device.selectedType?.id) {
      deleteType(JSON.stringify(device.selectedType?.id)).then(data => {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 1500);
        device.setSelectedType(null)

        fetchTypes().then(data => {
            device.setTypes(data)
          })
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
        Удалить тип
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle variant="outline-primary">
                {device.selectedType?.name || "Выберите тип"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {device.types.map(type =>
                    <Dropdown.Item onClick={() => device.setSelectedType(type)}
                     key={type.id}>{type.name}</Dropdown.Item>
                    )}
            </Dropdown.Menu>
        </Dropdown>
      </Form>

      <Alert className='mt-2 d-flex' show={showAlert} variant="success">
        <Alert.Heading>Тип удалён.</Alert.Heading>
      </Alert>

      <Alert className='mt-2 d-flex' show={showErrorAlert} variant="danger">
        <Alert.Heading>Выберите тип для удаления.</Alert.Heading>
      </Alert>

    </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={onDeleteType}>Удалить</Button>
        <Button variant="outline-primary" onClick={() => hideClear()}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
})

export default DeleteType