import React from 'react'
import {Container, Card, Form, Button, Row} from 'react-bootstrap'
import {NavLink, useLocation} from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'

function Auth() {

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

  return (
    <Container
        className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight - 54}}
    >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <Form className="d-flex flex-column">
                <Form.Control className="mt-3" placeholder="Введите email"/>
                <Form.Control className="mt-3" placeholder="Введите пароль"/>
                <Button variant="outline-primary" className="mt-3 align-self-center">
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
                <Row>
                    <div className="mt-1 text-center text-muted">
                        {isLogin ?
                        <NavLink to={REGISTRATION_ROUTE} style={{color:"gray"}}>Регистрация</NavLink>
                        :
                        <NavLink to={LOGIN_ROUTE} style={{color:'gray'}}>Есть аккаунт</NavLink>
                        }
                    </div>
                </Row>
            </Form>
        </Card>
    </Container>
  )
}

export default Auth