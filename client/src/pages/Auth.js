import {Context} from '../index'
import React, {useContext, useState} from 'react'
import {Container, Card, Form, Button, Row, Alert} from 'react-bootstrap'
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
    const [userName, setUserName] = useState('')
    const [show, setShow] = useState(false)


    const click = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            let data
            if(isLogin) {
                if(email && password) data = await login(email, password)
                else {
                setShow(true)
                return
                }
            }
            else {
                if(email && password && userName) data = await registration(email, password, userName)
                else {
                setShow(true)
                return
                }
            }
            user.setUser(data)
            user.setIsAuth(true)
            navigate('/')
        }catch(err) {
            alert(err.response.data.message)
        }
        
    }

  return (
    <Container
        className='d-flex justify-content-center align-items-center'
        style={{height: window.innerHeight - 54}}
    >
        <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <Form onSubmit={(e) => click(e)} className="d-flex flex-column">
                <Form.Control value={userName} hidden={isLogin}
                 onChange={(e) => setUserName(e.target.value)}
                  className="mt-3" placeholder="Введите имя пользователя (отображается в комментариях)"/>
                <Form.Control value={email}
                 onChange={(e) => setEmail(e.target.value)}
                  className="mt-3" type='email' placeholder="Введите email"/>
                <Form.Control value={password}
                 onChange={(e) => setPassword(e.target.value)}
                  className="mt-3" type="password" placeholder="Введите пароль"/>

                <Alert className='mt-3' variant="danger" show={show} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Введите все данные</Alert.Heading>
                </Alert>

                <Button type='sumbit' variant="outline-primary" className="mt-3 align-self-center"
                    
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