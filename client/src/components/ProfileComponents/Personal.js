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
            //@ts-ignore
            formData.append('img', file)    
  
      updateUser(formData).then(data => {
        user.setUser(data)

        // setTimeout(() => {
        //   check().then(data => {
        //     use
        //   })
        //}, 500);
      })
    }

    const selectFile = (e) => {
      let file = e.target.files[0]
      setFile(file)
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
                <Row>Фото профиля:</Row>
                <Row>
                  {console.log(user.user.img)}
                  <Image style={{maxWidth: '400px'}}
                   src={process.env.REACT_APP_BASE_URL + 'profilePics/' + user.user.img} />
                   
                </Row>
            </Col>
            :
            <Col className='m-2'>
                <Form>
                  <Form.Control disabled value={user.user.email} />
                  <Form.Control value={userName} onChange={(e) => setUserName(e.target.value)} />
                  <div style={{marginTop: 15}}>Изображение:</div>
                  <Form.Control onChange={selectFile} className="mt-2 mb-2" type='file'/>
                  <Col style={{display: 'flex', gap: 5, marginTop: "30px"}}>
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