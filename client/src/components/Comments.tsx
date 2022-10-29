import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Card, Image, Col } from 'react-bootstrap'
import { addComment, getComments, removeComment } from '../api/commentsApi'
import { Context } from '../index'
import TrashIcon from '../assets/trash3.svg'
import { Avatar } from '@mui/material'

type CommentsProps = {
    deviceId: number
}

const Comments = observer(({deviceId}: CommentsProps) => {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const [value, setValue] = useState('')


    const postComment = () => {
        addComment(deviceId, value).then(data => {
            getComments(deviceId).then(d => device.setComments(d))
        })
        setValue('')
    }

    const deleteComment = (deviceId: number, commentId: number) => {
        removeComment(deviceId, commentId).then(data => {
            setTimeout(() => {
                getComments(deviceId).then(d => device.setComments(d))   
            }, 500);
        })
    }

    useEffect(() => {
        getComments(deviceId).then(data => {
            device.setComments(data)
        })
    }, [device, deviceId])
    

  return (
    <div>
        {user.isAuth &&
        <Form>
            <Form.Control as='textarea' value={value} onChange={(e) => setValue(e.target.value)}
             placeholder='Написать комментарий'/>
            <Button className="mt-2" onClick={postComment} variant='outline-primary'>Отправить</Button>
        </Form>
        }

        <div className="mt-10">
        {device.comments.length 
            ?
            <>
            {device.comments.map((c) => {
                const date = c.comment.createdAt.split('T')
                const serverTime = date[1].split('.')
                let hour = serverTime[0].split(':')
                hour[0] = (Number(hour[0]) + 3).toString()
                let localTime = hour.toString()
                localTime = localTime.replaceAll(',', ':')

                return <Card className='mt-3' key={c.comment.id}>
                    <Card.Header className='d-flex' style={{backgroundColor: c.comment.userId === user.user.id ? 'lightcyan' : ''}}>
                        <Col>
                            <Col style={{display: 'flex', alignItems: 'center', gap: '7px'}}><Avatar sx={{height: '58px', width: '58px'}} src={`${process.env.REACT_APP_BASE_URL}/profilePics/${c.img}`}>test</Avatar><h5 style={{marginTop: 5}}>{c.userName}</h5></Col>
                            <i>{date[0]}</i>
                            <i>{`\n | \n${localTime}`}</i>
                        </Col>
                        {(c.comment.userId === user.user.id || user.user.role === 'ADMIN') && <Col className='d-flex justify-content-end'>
                            <Button onClick={() => deleteComment(c.comment.deviceId, c.comment.id)}
                             className='ml-auto' variant='outline-danger'>
                                <Image src={TrashIcon}/>
                            </Button>
                        </Col>}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        {c.comment.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
            }
            )}
            </>
            :
            <p>Комментариев нет! Будьте первым, кто оставит отзыв!</p>
        }
        </div>
    </div>
  )
})

export default Comments