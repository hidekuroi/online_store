import { observer } from 'mobx-react-lite'
import React, { useContext, useState } from 'react'
import { Card, Container, Row, Col, Form, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Context } from '../..'
import { check, updateUser } from '../../api/userApi'

const Personal = observer(() => {
    const {user} = useContext(Context)

    const [editMode, setEditMode] = useState(false)
    const [userName, setUserName] = useState(user.user.userName)
    const [file, setFile] = useState(null)

    const update = () => {
      const formData = new FormData()
          if(userName !== user.user.userName){
            formData.append('userName', userName.toString())
          }
          if(file) {
            //@ts-ignore
            formData.append('img', file)  
          }  

          if(userName !== user.user.userName || file){
            updateUser(formData).then(data => {
              user.setUser(data)
            })
          }
          
    }


    //@ts-ignore
    const selectFile = (e: any) => {
      let file = e.target.files[0]
      setFile(file)
    }

  return (
    <Container style={{border: '1px solid lightgray', borderRadius: '5px'}}>
        <h3>Личные данные</h3>
        <Link to='' onClick={() => setEditMode(true)}>Редактировать</Link>
        <Card className='d-flex justify-content-center m-2 p-2'>
            {!editMode 
            ? 
            <Col className='m-2'>
                <Row>Email: {user.user.email}</Row>
                <Row>Имя пользователя: {userName}</Row>
                <Row>Фото профиля:</Row>
                <Row>
                  <Image style={{maxWidth: '400px'}}
                   src={process.env.REACT_APP_BASE_URL + 'profilePics/' + user.user.img} />
                </Row>
            </Col>
            :
            <Col className='m-2'>
                <Form>
                  <div>Почта:</div>
                  <Form.Control disabled value={user.user.email} />
                  <div style={{marginTop: 15}}>Имя пользователя:</div>
                  <Form.Control value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <div style={{marginTop: 15}}>Фото профиля:</div>
                  <Form.Control onChange={selectFile} className="mt-1 mb-2" type='file'/>
                  <Col style={{display: 'flex', gap: 5, marginTop: "25px"}}>
                    <Button onClick={() => {
                      update()
                      setEditMode(false)
                      }} variant='success'>Сохранить</Button>
                    <Button onClick={() => {
                      setUserName(user.user.userName)
                      setEditMode(false)
                    }} variant='danger'>Отменить</Button>
                  </Col>
                </Form>
            </Col>
            }
        </Card>
    </Container>
  )
})

export default Personal