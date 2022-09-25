import React from 'react'
import { Card, Col, Button } from 'react-bootstrap'
import star from '../assets/star.svg'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
    const navigate = useNavigate()

  return (
    <Col md={3} className='mt-3'>
        <Card style={{width: 180, cursor: "pointer", border: 'light'}} onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card.Img variant='top' src={device.img}/>
            <Card.Body>
                <Card.Text style={{marginBottom: -5, color: 'gray'}}>Brandname</Card.Text>
                <Card.Title>{device.name}</Card.Title>
                <Card.Text><h4>{device.price}$</h4></Card.Text>
                <Card.Text className='d-flex align-items-center'>
                    {device.rating}
                    <img src={star} alt="Rating" width="14" height="14" />
                </Card.Text>
                <Button variant='primary' onClick={(e) => {e.preventDefault()}}>В корзину</Button>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default DeviceItem