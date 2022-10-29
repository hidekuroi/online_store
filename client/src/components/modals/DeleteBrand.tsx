import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Modal, Button, Form, Alert, Dropdown } from 'react-bootstrap'
import { deleteBrand, fetchBrands } from '../../api/deviceApi'
import { Context } from '../../index'
import { ModalPropsType } from '../../pages/Admin'

const DeleteBrand = observer(({show, onHide}: ModalPropsType) => {
  const {device} = useContext(Context)
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
    

  const onDeleteBrand = () => {
    if(device.selectedBrand[0]?.id) {
      deleteBrand(JSON.stringify(device.selectedBrand[0]?.id)).then(data => {
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 1500);
        device.setSelectedBrand([])

        fetchBrands().then(data => {
            device.setBrands(data)
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
        Удалить брэнд
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle variant="outline-primary">
                {device.selectedBrand[0]?.name || "Выберите брэнд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {device.brands.map(brand =>
                    <Dropdown.Item onClick={() => device.setSelectedBrand([brand])}
                     key={brand.id}>{brand.name}</Dropdown.Item>
                    )}
            </Dropdown.Menu>
        </Dropdown>
      </Form>

      <Alert className='mt-2 d-flex' show={showAlert} variant="success">
        <Alert.Heading>Брэнд удалён.</Alert.Heading>
      </Alert>

      <Alert className='mt-2 d-flex' show={showErrorAlert} variant="danger">
        <Alert.Heading>Выберите брэнд для удаления.</Alert.Heading>
      </Alert>

    </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={onDeleteBrand}>Удалить</Button>
        <Button variant="outline-primary" onClick={() => hideClear()}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
})

export default DeleteBrand