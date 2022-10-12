import React, { useContext } from 'react'
import {Context} from '../index'
import {Navbar, Container, Button, Image, Badge} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import avatar from '../assets/person-circle.svg'
import cart from '../assets/cart.svg'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const navigate = useNavigate()

  return (
    <Navbar bg="dark" variant="dark" >
        <Container style={{overflowX: 'auto'}}>
          <Navbar.Brand><NavLink style={{color: 'white', textDecoration: 'none'}} to={SHOP_ROUTE}>Online Store</NavLink></Navbar.Brand>
          {user.isAuth ?
            <>
              
              <Nav className="ml-auto" style={{color: 'white'}}>
                    <NavLink to={BASKET_ROUTE}>
                      <Button variant={'outline-primary'} style={{marginRight: '10px'}}>
                      <Image height={20} width={20}  src={cart}
                     style={{filter: 'invert(100%)'}}  />
                      <Badge pill bg="danger">{basket.basketDevices.length}</Badge>
                      </Button>
                    </NavLink>


                    <NavLink to={PROFILE_ROUTE + '/personal'}>
                      <Button variant={'outline-light'}>
                      <Image height={20} width={20}  src={avatar}
                      style={{filter: 'invert(100%)', marginRight: 10}}  />

                      {user.user.email}
                    
                      </Button>
                    </NavLink>
                  {
                    user.user.role === 'ADMIN'
                    &&
                    <NavLink to={ADMIN_ROUTE}>
                      <Button variant={'outline-light'} style={{marginLeft: '10px'}}>
                        Админ панель
                      </Button>
                    </NavLink>
                  }
                  <Button variant={'outline-light'} onClick={() => {
                    user.setUser({})
                    user.setIsAuth(false)
                    basket.setBasketDevices({})
                    navigate(LOGIN_ROUTE)
                    localStorage.removeItem('token')
                  }}
                  style={{marginLeft: '10px'}}>Выйти</Button>
              </Nav>
            </>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
              <NavLink to={LOGIN_ROUTE}>
                <Button variant={'outline-light'}>
                  Авторизация
                </Button>
              </NavLink>
              <NavLink to={REGISTRATION_ROUTE}>
                <Button style={{marginLeft: 10}} variant='outline-light'>
                  Регистрация
                </Button>
              </NavLink>
            </Nav>}
        </Container>
      </Navbar>
  )
})

export default NavBar