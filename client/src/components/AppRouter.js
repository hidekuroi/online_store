import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import {Context} from '../index'
import { AuthRoutes, PublicRoutes } from '../routes'


function AppRouter() {
    const {user} = useContext(Context)

    console.log(user)
  return (
    <Routes>
        {user.isAuth &&
            AuthRoutes.map(({path, Component}) => <Route path={path} element={Component()} />)
        }

        {PublicRoutes.map(({path, Component}) => <Route path={path} element={Component()}/>)}
        <Route path={'*'} element={<Navigate to='/'/>}/>
    </Routes>
  )
}

export default AppRouter