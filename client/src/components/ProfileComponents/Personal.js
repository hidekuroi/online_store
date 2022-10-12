import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../..'
import { updateUser } from '../../api/userApi'

const Personal = observer(() => {
    const {user} = useContext(Context)

    const [editMode, setEditMode] = useState(false)
    const [userName, setUserName] = useState(user.user.userName)

    const update = () => {
      updateUser(userName).then(data => {
        user.setUser(data)
      })
    }


  return (
    <Container style={{border: '1px solid lightgray', borderRadius: '5px'}}>
        <h3>Личные данные</h3>
        <Link onClick={() => setEditMode(true)}>Редактировать</Link>
        <Card className='d-flex justify-content-center m-2 p-2'>
            {!editMode 
            ? 
            <Col className='m-2'>
                <Row>Email: {user.user.email}</Row>
                <Row>Имя пользователя: {userName}</Row>
                <Row></Row>
            </Col>
            :
            <Col className='m-2'>
                <Form>
                  <Form.Control disabled value={user.user.email} />
                  <Form.Control value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <Button onClick={() => {
                    update()
                    setEditMode(false)
                    }} variant='success'>Сохранить</Button>
                  <Button onClick={() => {
                    setUserName(user.user.userName)
                    setEditMode(false)
                  }} variant='danger'>Отменить</Button>
                </Form>
            </Col>
            }
        </Card>
    </Container>
  )
})

export default Personal