import {Context} from '../index'
import React, {useContext, useState} from 'react'
import {Container, Card, Form, Button, Row} from 'react-bootstrap'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import { registration, login } from '../api/userApi'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { observer } from 'mobx-react-lite'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const click = async () => {
        try {
            let data
            if(isLogin) {
                data = await login(email, password)
            }
            else {
                data = await registration(email, password)
                console.log(data)
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate('/')
        }catch(e) {
            alert(e.response.data.message)
        }
        
    }

  return (
    <Container
        className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight - 54}}
    >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <Form className="d-flex flex-column">
                <Form.Control value={email}
                 onChange={(e) => setEmail(e.target.value)}
                  className="mt-3" placeholder="Введите email"/>
                <Form.Control value={password}
                 onChange={(e) => setPassword(e.target.value)}
                  className="mt-3" type="password" placeholder="Введите пароль"/>
                <Button variant="outline-primary" className="mt-3 align-self-center"
                    onClick={() => click()}
                >
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
})

export default Auth