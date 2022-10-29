import React, { useState, useEffect, useContext } from 'react'
import { Context } from '../index'
import { Container, Button, Col, Row } from 'react-bootstrap'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import DeleteBrand from '../components/modals/DeleteBrand'
import DeleteType from '../components/modals/DeleteType'
import DeleteDevice from '../components/modals/DeleteDevice'

function Admin() {
  const {device} = useContext(Context)
  const [typeVisible, setTypeVisible] = useState<boolean>(false)
  const [brandVisible, setBrandVisible] = useState<boolean>(false)
  const [deviceVisible, setDeviceVisible] = useState<boolean>(false)

  const [deleteBrandVisible, setDeleteBrandVisible] = useState<boolean>(false)
  const [deleteTypeVisible, setDeleteTypeVisible] = useState<boolean>(false)
  const [deleteDeviceVisible, setDeleteDeviceVisible] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      device.setSelectedBrand([])
      device.setSelectedType(null)
    }
  }, [])

  return (
    <Container className="d-flex">
      <Col>
        <Row className='justify-content-center'>
          <Button style={{width: '90%'}} 
          variant='outline-primary' className="mt-3 p-2"
          onClick={() => setTypeVisible(true)}>
            Добавить тип
          </Button>
        </Row>
        <Row className='justify-content-center'>
          <Button style={{width: '90%'}} 
          variant='outline-primary' className="mt-3 p-2"
          onClick={() => setBrandVisible(true)}>
            Добавить брэнд
          </Button>
        </Row>
        <Row className='justify-content-center'>
          <Button style={{width: '90%'}} 
          variant='outline-primary' className="mt-3 p-2"
          onClick={() => setDeviceVisible(true)}>
            Добавить устройство
          </Button>
        </Row>
      </Col>
      <Col className=''>
        <Row className='justify-content-center'>
          <Button style={{width: '90%'}} variant='outline-danger' className="mt-3 p-2"
          onClick={() => setDeleteTypeVisible(true)}>
            Удалить тип
          </Button>
        </Row>
        <Row className='justify-content-center'>
          <Button style={{width: '90%'}} variant='outline-danger' className="mt-3 p-2"
          onClick={() => setDeleteBrandVisible(true)}>
            Удалить брэнд
          </Button>
        </Row>
        <Row className='justify-content-center'>
          <Button style={{width: '90%'}} variant='outline-danger' className="mt-3 p-2"
          onClick={() => setDeleteDeviceVisible(true)}>
            Удалить устройтсво
          </Button>
        </Row>
      </Col>
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
      <DeleteBrand show={deleteBrandVisible} onHide={() => setDeleteBrandVisible(false)} />
      <DeleteType show={deleteTypeVisible} onHide={() => setDeleteTypeVisible(false)} />
      <DeleteDevice show={deleteDeviceVisible} onHide={() => setDeleteDeviceVisible(false)} />
    </Container>
  )
}

export default Admin

export type ModalPropsType = {
  show: boolean,
  onHide: () => void
}