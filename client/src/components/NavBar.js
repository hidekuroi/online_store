import React, { useContext, useEffect } from 'react'
import {Context} from '../index'
import {Navbar, Container, Button, Card, Image, Row, Col} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/person-circle.svg'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>Online Store</NavLink></Navbar.Brand>
          {user.isAuth ?
            <>
              
              <Nav className="ml-auto" style={{color: 'white'}}>
              <div className='mt-auto mb-auto'
               style={{backgroundColor: 'transparent', border: '1px white solid', borderRadius: 5}}>
                    <div style={{color: 'white', fontStyle: 'italic', margin: 6}}>
                    <Image height={20} width={20}  src={avatar}
                     style={{filter: 'invert(100%)', marginRight: 10}}  />

                      {user.user.email}

                    </div>
              </div>
                  {
                    user.user.role === 'ADMIN'
                    &&
                    <Button variant={'outline-light'} style={{marginLeft: '10px'}}
                     onClick={() => {navigate(ADMIN_ROUTE)}}>Админ панель</Button>
                  }
                  <Button variant={'outline-light'} onClick={() => {
                    user.setUser({})
                    user.setIsAuth(false)
                    navigate(LOGIN_ROUTE)
                    localStorage.removeItem('token')
                  }}
                  style={{marginLeft: '10px'}}>Выйти</Button>
              </Nav>
            </>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
                <Button variant={'outline-light'} onClick={() => navigate('login')}>Авторизация</Button>
            </Nav>}
        </Container>
      </Navbar>
  )
})

export default NavBar