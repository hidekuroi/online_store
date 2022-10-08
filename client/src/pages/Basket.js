import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { deleteBasketDevice, getBasketDevices } from '../api/basketApi'
import { Context } from '../index'
import { ListGroup, Container, Col, Card, Button, Row } from 'react-bootstrap'
import { fetchBrands } from '../api/deviceApi'
import BasketItem from '../components/BasketItem'

const Basket = observer(() => {
  const {basket} = useContext(Context)
  const {device} = useContext(Context)
  const {user} = useContext(Context)

  useEffect(() => {
    if(user.isAuth){getBasketDevices().then(data => {
      basket.setBasketDevices(data.devices)
      basket.setTotalPrice(data.totalPrice)
    })}
    fetchBrands().then(data => {
      device.setBrands(data)
    })
  }, [])

  const deleteBasketItem = (id) => {
    deleteBasketDevice(id).then(data => {
      getBasketDevices().then(data => {
        basket.setBasketDevices(data.devices)
        basket.setTotalPrice(data.totalPrice)
      })
    })
  }
  

  return (
    <Container className="d-flex mt-3 mb-3">
    {basket.basketDevices.length > 0 ?
    <>
      <Container className=''>
        <Row>
          <Col md={9} className='p-2'>

            <ListGroup as="ol" numbered>
              {basket.basketDevices.map(d => 

              <BasketItem d={d}
              brand={device.brands.map((b) => b.id === d.deviceInfo.brandId && b.name)}
              deleteBasketItem={(id) => deleteBasketItem(id)} />
              
              )}
            </ListGroup>

          </Col>
          <Col md={3} className='p-2'>
            <Card >
              <Card.Header as="h5">Общая стоимость</Card.Header>
              <Card.Body className='justify-content-center align-items-center'>
                <Card.Title>{basket.totalPrice}$</Card.Title>
                <Button className='mt-1' variant="primary">Оформить заказ</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    :
    <>
    <hr />
    <h2>Корзина пуста.</h2>
    </>
    }
    </Container>
  )
})

export default Basket