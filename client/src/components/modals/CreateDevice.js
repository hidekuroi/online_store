import React, { useContext, useState } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap'
import { Context } from '../../index'


const CreateDevice = ({show, onHide}) => {
    const {device} = useContext(Context)
    const [info, setInfo] = useState([])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

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
        Добавить устройство
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
            <Dropdown.Menu>
                {device.types.map(type =>
                    <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                    )}
            </Dropdown.Menu>
        </Dropdown>
        <Dropdown className='mt-2 mb-2'>
            <Dropdown.Toggle>Выберите брэнд</Dropdown.Toggle>
            <Dropdown.Menu>
                {device.brands.map(brand =>
                    <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                    )}
            </Dropdown.Menu>
        </Dropdown>
        <Form>
            <Form.Control className="mt-2 mb-2" placeholder={'Название устройства'}/>
            <Form.Control className="mt-2 mb-2" placeholder={'Стоимость устройства'} type='number'/>
            <div>Изображение: <Form.Control className="mt-2 mb-2" type='file'/></div>
            <hr />
            <Button onClick={addInfo} variant='outline-primary'>Добавить новое свойство-характеристику</Button>
            {info.map(i => 
                <Row className="mt-2 mb-2" key={i.number}>
                    <Col md={4}>
                        <Form.Control placeholder={'Имя характеристики'} />
                    </Col>
                    <Col md={4}>
                        <Form.Control placeholder={'Описание характеристики'} />
                    </Col>
                    <Col md={4}>
                        <Button variant="danger" onClick={() => removeInfo(i.number)}>Удалить</Button>
                    </Col>
                </Row>
                )}
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={onHide}>Добавить</Button>
        <Button variant="danger" onClick={onHide}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateDevice