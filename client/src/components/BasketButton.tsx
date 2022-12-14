import { observer } from 'mobx-react-lite'
import React, { useEffect, useState, useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { addToBasket, getBasketDevices } from '../api/basketApi'
import {Context} from '../index'
import { basketDeviceType } from '../types/types'

type BasketButtonPropsType = {
  deviceId?: number
}

const BasketButton = observer(({deviceId}: BasketButtonPropsType) => {
    const [isAdded, setIsAdded] = useState<boolean>(false)
    const {basket} = useContext(Context)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    deviceId = deviceId ? deviceId : 0

    const add = () => {
      //@ts-ignore
        addToBasket(deviceId).then(data => {
          getBasketDevices().then(d => {
            basket.setBasketDevices(d.devices)
          })
        })
        setIsAdded(true)
    }

    useEffect(() => {
      if(basket.basketDevices.length > 0) basket.basketDevices.map((d: basketDeviceType) => d.deviceInfo.id === deviceId && setIsAdded(true))
    }, [deviceId])
    

    useEffect(() => {
        if(basket.basketDevices.length > 0) basket.basketDevices.map((d: basketDeviceType) => d.deviceInfo.id === deviceId && setIsAdded(true))
    }, [basket.basketDevices])
    

  return (
    <>
    {user.isAuth ?
    <>
    {isAdded 
    ? 
    <Button variant='light' disabled> Добавлено</Button>
    :
    <Button variant='primary' onClick={add}>В корзину</Button>
    }
    </>
    : <> <Button onClick={() => navigate('/login')}>В корзину</Button> </>}
    </>
  )
})

export default BasketButton