import React from 'react'
import { Card, Col } from 'react-bootstrap'
import star from '../assets/star.svg'
import {Link} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
import BasketButton from './BasketButton'
import classes from './DeviceItem.module.css'

const DeviceItem = ({device, brand}) => {


  return (
    <Col md={3} className='mt-3'>
        <Card style={{border: 'light'}} className={classes.item}>
            <Link to={`${DEVICE_ROUTE}/${device.id}`}>
                <Card.Img style={{cursor: 'pointer'}}
                variant='top' src={process.env.REACT_APP_BASE_URL + device.img}/>
            </Link>
            <Card.Body>
                <Card.Text style={{marginBottom: -3, color: 'gray', marginTop: -10}}>{brand}</Card.Text>
                <Card.Title><Link style={{textDecoration: 'none', color: 'black'}} to={`${DEVICE_ROUTE}/${device.id}`}>{device.name}</Link></Card.Title>
                <Card.Text style={{fontWeight: 'bold', fontSize: 24}}>{device.price}$</Card.Text>
                <Card.Text className='d-flex align-items-center'>
                    {Math.floor(device.rating * 100) / 100}
                    <img src={star} alt="Rating" width="14" height="14" />
                </Card.Text>
                <BasketButton deviceId={device.id}/>
            </Card.Body>
        </Card>
    </Col>
  )
}

export default DeviceItem