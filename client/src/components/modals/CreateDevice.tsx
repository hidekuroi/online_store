import { observer } from 'mobx-react-lite'
import React, { useContext, useState, useEffect } from 'react'
import { Modal, Button, Form, Dropdown, Row, Col, Alert } from 'react-bootstrap'
import { createDevice, fetchBrands, fetchTypes } from '../../api/deviceApi'
import { Context } from '../../index'
import { ModalPropsType } from '../../pages/Admin'


const CreateDevice = observer(({show, onHide}: ModalPropsType) => {
    const {device} = useContext(Context)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [info, setInfo] = useState([{title: '', description: '', number: 0}])

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [file, setFile] = useState(null)
    const [additionalFiles, setAdditionalFiles] = useState([])

    useEffect(() => {
        fetchTypes().then(data => {
          device.setTypes(data)
        })
        fetchBrands().then(data => {
          device.setBrands(data)
        })

        return () => {
            setInfo(info.filter(i => i.title.length !== 0))
        }
      }, [show])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }

    const removeInfo = (number: number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    const changeInfo = (key: string, value: string, number: number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    //@ts-ignore
    const selectAdditionalFiles = (e: any) => {
        setAdditionalFiles(e.target.files)
    }
    //and here (fix later)
    const selectFile = (e: any) => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        if(name && price && device.selectedBrand[0].id && device.selectedType?.id && file) {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', price)
            formData.append('brandId', device.selectedBrand[0].id.toString())
            formData.append('typeId', device.selectedType.id.toString())
            formData.append('img', file)
            formData.append('info', JSON.stringify(info))

            if(additionalFiles) {
                for (let i = 0; i < additionalFiles.length; i++) {
                    formData.append("imgs", additionalFiles[i])
                }
            }
            
            createDevice(formData).then(data => {})

            setShowSuccess(true)
            setTimeout(() => {
                setShowSuccess(false)
            }, 1500);
        }
        else {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 1500);
        }
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

        <Form>
            <Form.Control value={name} onChange={(e) => setName(e.target.value)}
             className="mt-2 mb-2" placeholder={'Название устройства'}/>

            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)}
             className="mt-2 mb-2" placeholder={'Стоимость устройства'} type='number'/>

            <div>Изображение: <Form.Control onChange={selectFile} className="mt-2 mb-2" type='file'/></div>
            <div>Дополнительные изображения: <Form.Control multiple onChange={selectAdditionalFiles} className='mt-2 mb-2' type='file'/></div>

            <hr />

            <Button onClick={addInfo} variant='outline-primary'>Добавить новое свойство-характеристику</Button>
            {info.map(i => 
                <Row className="mt-2 mb-2" key={i.number}>
                    <Col md={4}>
                        <Form.Control value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number)}
                         placeholder={'Имя характеристики'} />
                    </Col>
                    <Col md={4}>
                        <Form.Control value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)}
                         placeholder={'Описание характеристики'} />
                    </Col>
                    <Col md={4}>
                        <Button variant="danger" onClick={() => removeInfo(i.number)}>Удалить</Button>
                    </Col>
                </Row>
                )}
        </Form>

        <Alert className='mt-2 d-flex' show={showSuccess} variant="success">
            <Alert.Heading>Устройство добавлено.</Alert.Heading>
        </Alert>

        <Alert className='mt-2 d-flex' show={showError} variant="danger">
            <Alert.Heading>Заполните все обязательные поля.</Alert.Heading>
        </Alert>

    </Modal.Body>

    <Modal.Footer>
        <Button variant="primary" onClick={addDevice}>Добавить</Button>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
    </Modal.Footer>
  </Modal>
  )
})

export default CreateDevice