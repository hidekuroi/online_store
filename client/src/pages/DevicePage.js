import React, { useEffect, useState } from 'react'
import { Container, Image, Col, Row, Button, Card } from 'react-bootstrap'
import star from '../assets/star.svg'
import { useParams } from 'react-router-dom'
import { fetchOneDevice } from '../api/deviceApi'

const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])
  

  return (
    <Container className="mt-3">
      <Row>
      <Col md={4}>
        <Image width={400} height={400} src={process.env.REACT_APP_BASE_URL + device.img} />
      </Col>
      <Col md={4}>
        <Row className="d-flex flex-column align-items-center justify-content-center">
          <h2>{device.name}</h2>
          <div className="d-flex align-items-center " style={{fontSize:32}}>
            {`Рейтинг: ${device.rating}`}
            <img src={star} alt="Rating" width="28" height="28" />
          </div>
        </Row>
      </Col>
      <Col md={4}>
        <Card className="justify-content-center d-flex flex-column align-items-center pt-2 pb-2" style={{backgroundColor: 'rgba(250,250,250)'}}>
          <h3>{`${device.price}`}$</h3>
          <Button variant="outline-primary">Добавить в корзину</Button>
        </Card>
      </Col>
      </Row>
      <Row className="d-flex flex-column m-2">
        <h3>Характеристики:</h3>
        {device.info.map((info, index) => 
          <Row style={{backgroundColor: index % 2 === 0 ? 'rgba(250,250,250)' : 'transparent', padding: 7}}
            className="d-inline-flex flex-column" key={info.id}>{info.title}: {info.description}</Row>
          )}
      </Row>
    </Container>
  )
}

export default DevicePage