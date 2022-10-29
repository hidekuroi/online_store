import React, { useContext } from 'react'
import { ListGroup, Image, Badge, Button, Col, Row, ButtonGroup, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getBasketDevices, updateAmount } from '../api/basketApi'
import { Context } from '../index'
import { basketDeviceType } from '../types/types'

type BasketItemProps = {
  d: basketDeviceType,
  brand: string,

  deleteBasketItem: (id: number) => void
}

const BasketItem = ({d, brand, deleteBasketItem}: BasketItemProps) => {
    const navigate = useNavigate()
    const {basket} = useContext(Context)

    const changeAmount = (amount: number) => {
      if(amount >= 1) {
        updateAmount(d.basketDeviceId, amount).then(data => {
          getBasketDevices().then(d => {
            basket.setBasketDevices(d.devices)
            basket.setTotalPrice(d.totalPrice)
          })
        })
      }
      else deleteBasketItem(d.basketDeviceId)
    }
    

  return (
    <ListGroup.Item as='li'
      className="d-flex justify-content-between align-items-start"
      >
          <Col md={9}>
            <Row>
                <Image style={{marginLeft: 10, cursor: 'pointer', maxWidth: 150}} onClick={() => navigate(`/device/${d.deviceInfo.id}`)}
                src={process.env.REACT_APP_BASE_URL + d.deviceInfo.img}/>
                <div className='ms-2 me-auto'>
                  <div className='fw-bold' onClick={() => navigate(`/device/${d.deviceInfo.id}`)}
                  style={{fontSize: 20, cursor: 'pointer'}}>{d.deviceInfo.name}</div>
                  {brand}
                </div>
            </Row>
          </Col>
          <Col className='d-flex  justify-content-end align-items-stretch' md={3}>

            <Card>
              <Card.Body>
                <Card.Title className='d-flex justify-content-between'>
                  <Badge className="align-items-center"
                  style={{width: 100, height: 35, fontSize: 18, cursor: 'pointer'}} bg='success'>
                    {d.deviceInfo.price * d.amount}$
                  </Badge>
                  <Button onClick={() => deleteBasketItem(d.basketDeviceId)}
                  className='alignt-items-center'
                  style={{height: 35, marginLeft: 5}} variant='outline-danger'>X</Button>
                </Card.Title>
                <ButtonGroup>
                <Button onClick={() => changeAmount(d.amount - 1)} variant='outline-secondary'>-</Button>
                <div style={{padding: 0, border: '1px solid lightgray'}}>Количество: {d.amount}</div>
                <Button onClick={() => changeAmount(d.amount + 1)} variant='outline-secondary'>+</Button>
              </ButtonGroup>
              </Card.Body>
            </Card>

          </Col>
      </ListGroup.Item>
  )
}

export default BasketItem