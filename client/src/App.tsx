import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { getBasketDevices } from "./api/basketApi";
import { check } from "./api/userApi";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {Context} from './index'

const App = observer(() => {
  const {user} = useContext(Context)
  const {basket} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [user])

  useEffect(() => {
    if(user.isAuth){
      getBasketDevices().then(data => {
      basket.setBasketDevices(data.devices)
    })}
  }, [user.isAuth])
  

  if(loading) {
    return <Spinner animation="grow"/>
  }  

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
})

export default App;
