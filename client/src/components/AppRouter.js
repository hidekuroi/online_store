import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Context} from '../index'
import Admin from '../pages/Admin'
import Auth from '../pages/Auth'
import Basket from '../pages/Basket'
import DevicePage from '../pages/DevicePage'
import Profile from '../pages/Profile'
import Shop from '../pages/Shop'
//import { AuthRoutes, PublicRoutes } from '../routes'
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'


const AppRouter = observer(() => {
    const {user} = useContext(Context) 

    return (
    <Routes>
      {/*
       This shit throws an error like "Component (in element attribute btw) is not a function" 
       when i wrappin' one of them into mobx observer() func...
       so ill make it without mapping it
       (that happens cause of rrd-v6...............)
       */}
        {/* {user.isAuth &&
            AuthRoutes.map(({path, Component}) => <Route path={path} element={Component()} />)
        }

        {PublicRoutes.map(({path, Component}) => <Route path={path} element={Component()}/>)} */}
        {user.isAuth && 
        <>
        {user.user.role === 'ADMIN' && <Route path={ADMIN_ROUTE} element={<Admin />} />}
        <Route path={PROFILE_ROUTE + '/:param'} element={<Profile />} />
        <Route path={BASKET_ROUTE} element={<Basket />} />
        </>}

        <Route path={DEVICE_ROUTE + '/:id'} element={<DevicePage />} />
        {!user.isAuth &&
        <>
          <Route path={LOGIN_ROUTE} element={<Auth />} />
          <Route path={REGISTRATION_ROUTE} element={<Auth />} />
        </>
        }
        <Route path={SHOP_ROUTE} element={<Shop />} />

        <Route path={'*'} element={<Navigate to='/'/>}/>
    </Routes>
  )
})

export default AppRouter