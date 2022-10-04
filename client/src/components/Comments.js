import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { addComment, getComments } from '../api/commentsApi'
import { Context } from '../index'

const Comments = observer(({deviceId}) => {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const [value, setValue] = useState('')


    const postComment = () => {
        addComment(deviceId, value).then(data => {
            getComments(deviceId).then(d => device.setComments(d))
        })
        setValue('')
    }

    useEffect(() => {
        getComments(deviceId).then(data => {
            device.setComments(data)
        })
    }, [])
    

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
            {device.comments.map((c) => 
                <Card className='mt-3'>
                    <Card.Header>
                        <h5>{c.userName}</h5>
                        <i>{c.comment.createdAt}</i>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        {c.comment.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
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