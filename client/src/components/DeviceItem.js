import React, { useContext } from 'react'
import { Card, Col, Button } from 'react-bootstrap'
import star from '../assets/star.svg'
import {useNavigate} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device, brand}) => {

    const navigate = useNavigate()

  return (
    <Col md={3} className='mt-3'>
        <Card style={{width: 180, border: 'light'}}>
            <Card.Img style={{cursor: 'pointer'}} onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
             variant='top' src={process.env.REACT_APP_BASE_URL + device.img}/>
            <Card.Body>
                <Card.Text style={{marginBottom: -3, color: 'gray', marginTop: -10}}>{brand}</Card.Text>
                <Card.Title>{device.name}</Card.Title>
                <Card.Text style={{fontWeight: 'bold', fontSize: 24}}>{device.price}$</Card.Text>
                <Card.Text className='d-flex align-items-center'>
                    {device.rating}
                    <img src={star} alt="Rating" width="14" height="14" />
                </Card.Text>
                <Button variant='primary' onClick={(e) => {console.log('btn')}}>В корзину</Button>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default DeviceItem