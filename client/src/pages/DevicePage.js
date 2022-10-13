import React, { useContext, useEffect, useState } from 'react'
import { Container, Image, Col, Row, Button, Card, Form, InputGroup, Modal, Spinner, Carousel} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteDevice, fetchOneDevice, updateDevice } from '../api/deviceApi'
import BasketButton from '../components/BasketButton'
import { observer } from 'mobx-react-lite'
import { SHOP_ROUTE } from '../utils/consts'
import Comments from '../components/Comments'
import RatingComponent from '../components/RatingComponent'
import {Context} from '../index'

const DevicePage = observer(() => {
  const [device, setDevice] = useState({info: []})
  const [editMode, setEditMode] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [file, setFile] = useState(null)
  const [additionalFiles, setAdditionalFiles] = useState(null)

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const {id} = useParams()
  const {user} = useContext(Context)
  const navigate = useNavigate()

  useEffect(() => {
    if(id) fetchOneDevice(id).then(data => {
      data.info.forEach((i) => i.toDelete = false)
      setDevice(data)
      setIsLoading(false)
    })
  }, [])

  const selectFile = (e) => {
    setFile(e.target.files[0])
  }

  const addInfo = () => {
    let deviceCopy = {...device}
      deviceCopy.info = [...device.info]
      deviceCopy.info.push({title: '', description: '', number: Date.now()})
      setDevice(deviceCopy)
  }

  const deviceDelete = () => {
    deleteDevice(device.id).then(data => {
      navigate('/')
    })
  }

  const selectAdditionalFiles = (e) => {
    setAdditionalFiles(e.target.files)
}

  const updateDev = (mode) => {
    if(!mode) {
      let newDev = {...device}
      const formData = new FormData()
            formData.append('name', newDev.name)
            formData.append('price', newDev.price)
            formData.append('id', newDev.id)
            formData.append('brandId', newDev.brandId)
            formData.append('typeId', newDev.typeId)
            formData.append('img', file)
            formData.append('info', JSON.stringify(newDev.info))

            for (let i = 0; i < additionalFiles.length; i++) {
              formData.append("imgs", additionalFiles[i])
            }

      updateDevice(formData).then(data => {
        setTimeout(() => {
          fetchOneDevice(id).then(data => setDevice(data))
        }, 500);
      })
    }
  }


  if(isLoading) return(<Spinner animation="grow" />)

  return (
    <Container className="mt-3">
      {device ? <>
      <Row>
      <Col md={4}>
        {device.images.length === 0 
        ?
        <>
        <Image
          style={{scale: '100%', maxHeight: 800, border: '1px solid lightgray', borderRadius: '4px'}}
        fluid
         src={process.env.REACT_APP_BASE_URL + device.img} />
         {editMode && 
          <>
            <div>Главное изображение: <Form.Control onChange={selectFile} className="mt-2 mb-2" type='file'/></div>
            <div>Дополнительные изображения: <Form.Control multiple onChange={selectAdditionalFiles} className='mt-2 mb-2' type='file'/></div>
          </>
          }
         </>
         :
         <>
          <Carousel style={{border: '1px solid lightgray', borderRadius: '4px'}}
           interval={null} activeIndex={index} onSelect={handleSelect}>

            <Carousel.Item className='justify-content-center'>
              <Image
                fluid
                style={{scale: '100%', maxHeight: 650}}
                className="d-block m-auto"
                src={process.env.REACT_APP_BASE_URL + device.img}
                alt="First slide"
              />
            </Carousel.Item>

            {device.images.map((img) => {
              return <Carousel.Item key={img.id}
              className='justify-content-center'>
              <Image
                fluid
                style={{scale: '100%', maxHeight: 650}}
                className="d-block m-auto"
                src={process.env.REACT_APP_BASE_URL + img.img}
                alt="First slide"
              />
            </Carousel.Item>
            })}
          </Carousel>
          {editMode && 
          <>
            <div>Главное изображение: <Form.Control onChange={selectFile} className="mt-2 mb-2" type='file'/></div>
            <div>Дополнительные изображения: <Form.Control multiple onChange={selectAdditionalFiles} className='mt-2 mb-2' type='file'/></div>
          </>
          }
         </>
         }
      </Col>
      <Col md={4}>
        <Row className="d-flex flex-column align-items-center justify-content-center">
          <h2>{editMode 
          ? <Form><Form.Control value={device.name} onChange={(e) => setDevice({...device, name: e.target.value})}/></Form> 
          : `${device.name}`}</h2>
          <div>
            <RatingComponent deviceId={id} overallRating={device.rating} />
          </div>
        </Row>
      </Col>
      <Col md={4}>
        <Card className="justify-content-center d-flex flex-column align-items-center pt-2 pb-2" style={{backgroundColor: 'rgba(250,250,250)'}}>
          <h3>{editMode 
          ? <Form><Form.Control type='number' onChange={(e) => setDevice({...device, price: e.target.value})}
           value={device.price}/></Form> 
          : `${device.price}`}$</h3>
          <BasketButton deviceId={Number(id)}/>
          {user.user.role === "ADMIN" && <Card.Footer className='mt-2'>
            <Button onClick={() => {
              setEditMode(!editMode)
              updateDev(!editMode)
            }}
             variant={editMode ? 'outline-success' : 'outline-warning'}
             >{editMode ? "Сохранить" : "Редактировать данные устройства"}</Button>
            <Button className='mt-2' onClick={() => setIsModal(true)}
             variant='outline-danger' >Удалить устройство</Button>

          </Card.Footer>}
        </Card>
      </Col>
      </Row>

      <Row className="d-flex flex-column m-2">
        <h3>Характеристики:</h3>
        <Row className='m-2'>
          {device.info.map((info, index) => 
            <Row style={{backgroundColor: index % 2 === 0 ? 'rgba(250,250,250)' : 'transparent', padding: 7}}
              className="d-inline-flex flex-column" key={info.id}>
                {editMode 
                ? <div><InputGroup className="mb-3">
                    <InputGroup.Text>{index + 1}</InputGroup.Text>
                    <Form.Control isInvalid={info.toDelete} value={info.title} aria-label="Название характеристики" onChange={(e) => {
                      let deviceCopy = {...device}
                      deviceCopy.info = [...device.info]
                      deviceCopy.info[index].title = e.target.value
                      setDevice(deviceCopy)
                    }} />
                    <Form.Control isInvalid={info.toDelete} value={info.description} aria-label="Свойство" onChange={(e) => {
                      let deviceCopy = {...device}
                      deviceCopy.info = [...device.info]
                      deviceCopy.info[index].description = e.target.value
                      setDevice(deviceCopy)
                    }} />
                    <Button variant={info.toDelete ? 'danger' : 'outline-danger'} onClick={() => {
                      let deviceCopy = {...device}
                      deviceCopy.info = [...device.info]
                      deviceCopy.info[index].toDelete = !info.toDelete
                      setDevice(deviceCopy)
                    }}>x</Button>
                  </InputGroup> 
                  </div>
                : `${info.title}: ${info.description}`}
                </Row>
          )}
          {editMode && <Button onClick={addInfo} variant='outline-primary'>Добавить характеристику</Button>}
        </Row>
      </Row>

      <Row className="d-flex flex-column m-2" style={{paddingTop: 30, paddingBottom: 50}}>
        <h3>Комментарии:</h3>
        <Comments deviceId={id} />
      </Row>

      <Modal show={isModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Удаление устройства
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Вы действительно хотите удалить это устройство и все данные (+ комментарии) о нём?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={() => deviceDelete()}>Удалить</Button>
        <Button onClick={() => setIsModal(false)}>Отмена</Button>
      </Modal.Footer>
    </Modal>
      
      </>
      :
      <>404</>
    }
    </Container>
  )
})

export default DevicePage