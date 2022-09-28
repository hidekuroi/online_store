import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'

function Admin() {
  const [typeVisible, setTypeVisible] = useState(false)
  const [brandVisible, setBrandVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)

  return (
    <Container className="d-flex flex-column">
      <Button 
       variant='outline-primary' className="mt-3 p-2"
       onClick={() => setTypeVisible(true)}>
        Добавить тип
      </Button>

      <Button 
       variant='outline-primary' className="mt-3 p-2"
       onClick={() => setBrandVisible(true)}>
        Добавить брэнд
      </Button>

      <Button 
       variant='outline-primary' className="mt-3 p-2"
       onClick={() => setDeviceVisible(true)}>
        Добавить устройство
      </Button>
      
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
    </Container>
  )
}

export default Admin