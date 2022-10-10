import { observer } from 'mobx-react-lite'
import React from 'react'
import { Container, Col, Card, ListGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MyComments from '../components/ProfileComponents/MyComments'
import Personal from '../components/ProfileComponents/Personal'
import { PROFILE_ROUTE } from '../utils/consts'

const Profile = observer(() => {

    const {param} = useParams()
    const navigate = useNavigate()

  return (
    <Container className='mt-2 d-flex'>
        <Col className='p-2' md={3}>
            <Card>
            <Card.Header>Данные</Card.Header>
            <ListGroup>
                <ListGroup.Item style={{cursor: 'pointer'}} active={param == 'personal'}
                onClick={() => navigate(`${PROFILE_ROUTE}/personal`)}>
                    Личные данные
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} active={param == 'orders'}
                onClick={() => navigate(`${PROFILE_ROUTE}/orders`)}>
                    Мои заказы
                </ListGroup.Item>
                <ListGroup.Item style={{cursor: 'pointer'}} active={param == 'comments'}
                onClick={() => navigate(`${PROFILE_ROUTE}/comments`)}>
                    Мои отзывы
                </ListGroup.Item>
            </ListGroup>
    </Card>
        </Col>
        <Col className='p-2' md={9}>
            {param === 'personal' && <Personal />}
            {param === 'orders' && <Container>orders</Container>}
            {param === 'comments' && <MyComments />}
        </Col>
    </Container>
  )
})

export default Profile