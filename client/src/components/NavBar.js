import React, { useContext } from 'react'
import {Context} from '../index'
import {Navbar, Container, Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
    const {user} = useContext(Context)
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>Online Store</NavLink></Navbar.Brand>
          {user.isAuth ?
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={'outline-light'}>Админ панель</Button>
                <Button variant={'outline-light'} style={{marginLeft: '10px'}}>Выйти</Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={'outline-light'} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
            </Nav>}
        </Container>
      </Navbar>
  )
})

export default NavBar