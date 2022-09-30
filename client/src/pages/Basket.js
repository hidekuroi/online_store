import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { getBasketDevices } from '../api/basketApi'
import { Context } from '../index'

const Basket = observer(() => {
  const {basket} = useContext(Context)

  useEffect(() => {
    getBasketDevices().then(data => {
      basket.setBasketDevices(data)
    })
  }, [])
  
  console.log(basket)

  return (
    <div>Basket</div>
  )
})

export default Basket