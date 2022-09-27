import React, { useContext } from 'react'
import {Context} from '../index'
import {Navbar, Container, Button} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>Online Store</NavLink></Navbar.Brand>
          {user.isAuth ?
            <Nav className="ml-auto" style={{color: 'white'}}>
                {
                  user.user.role === 'ADMIN'
                   &&
                  <Button variant={'outline-light'} onClick={() => {navigate(ADMIN_ROUTE)}}>Админ панель</Button>
                }
                <Button variant={'outline-light'} onClick={() => {
                  navigate(LOGIN_ROUTE)
                  user.setIsAuth(false)
                }}
                style={{marginLeft: '10px'}}>Выйти</Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={'outline-light'} onClick={() => navigate('login')}>Авторизация</Button>
            </Nav>}
        </Container>
      </Navbar>
  )
})

export default NavBar