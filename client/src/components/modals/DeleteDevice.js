import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form, Alert, Dropdown } from 'react-bootstrap'
import { deleteDevice, fetchDevices } from '../../api/deviceApi'
import { Context } from '../../index'

const DeleteDevice = observer(({show, onHide}) => {
  const {device} = useContext(Context)
  const [value, setValue] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)


  const onDeleteDevice = () => {
    if(value.length > 0) {
      deleteDevice(value).then(data => {
        if(data > 0){
          setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 1500);

        fetchDevices().then(data => {
            device.setDevices(data)
          })
        }
        else {
          alert('Не найдено устройства с данным id.')
        }

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
        Удалить брэнд
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Control value={value} onChange={(e) => setValue(e.target.value)}
         type='number' placeholder="Введите id устройства, которое хотите удалить"/>
      </Form>

      <Alert className='mt-2 d-flex' show={showAlert} variant="success">
        <Alert.Heading>Устройство удалено.</Alert.Heading>
      </Alert>

      <Alert className='mt-2 d-flex' show={showErrorAlert} variant="danger">
        <Alert.Heading>Введите id.</Alert.Heading>
      </Alert>

    </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={onDeleteDevice}>Удалить</Button>
        <Button variant="outline-primary" onClick={() => hideClear()}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
})

export default DeleteDevice