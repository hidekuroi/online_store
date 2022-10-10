import React, { useContext } from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Context } from '../..'

const Personal = () => {

    const {user} = useContext(Context)

  return (
    <Container style={{border: '1px solid lightgray', borderRadius: '5px'}}>
        <h3>Личные данные</h3>
        <Card className='d-flex justify-content-center m-2 p-2'>
            <Col className='m-2'>
                <Row>Email: {user.user.email}</Row>
                <Row>Имя пользователя: {user.user.userName}</Row>
                <Row></Row>
            </Col>
        </Card>
    </Container>
  )
}

export default Personal