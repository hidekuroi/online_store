import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { deleteBasketDevice, getBasketDevices } from '../api/basketApi'
import { Context } from '../index'
import { ListGroup, Container } from 'react-bootstrap'
import { fetchBrands } from '../api/deviceApi'
import BasketItem from '../components/BasketItem'

const Basket = observer(() => {
  const {basket} = useContext(Context)
  const {device} = useContext(Context)
  const {user} = useContext(Context)

  useEffect(() => {
    if(user.isAuth){getBasketDevices().then(data => {
      basket.setBasketDevices(data)
    })}
    fetchBrands().then(data => {
      device.setBrands(data)
    })
  }, [])

  const deleteBasketItem = (id) => {
    deleteBasketDevice(id).then(data => {
      getBasketDevices().then(data => {
        basket.setBasketDevices(data)
      })
    })
  }
  

  return (
    <Container className="mt-3 mb-3">
    <ListGroup as="ol" numbered>
    {basket.basketDevices.length > 0 ?
    <>
      {basket.basketDevices.map(d => 

      <BasketItem d={d}
       brand={device.brands.map((b) => b.id === d.deviceInfo.brandId && b.name)}
       deleteBasketItem={(id) => deleteBasketItem(id)} />
      
      )}
    </>
    :
    <>
    <hr />
    <h2>Корзина пуста.</h2>
    </>
    }
    </ListGroup>
    </Container>
  )
})

export default Basket