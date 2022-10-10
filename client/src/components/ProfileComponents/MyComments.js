import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { getMyComments } from '../../api/commentsApi'
import { Card, Col, Button, Image } from 'react-bootstrap'
import TrashIcon from '../../assets/trash3.svg'
import { useNavigate } from 'react-router-dom'

const MyComments = observer(() => {
    const [comments, setComments] = useState([])
    const navigate = useNavigate()
    const {user} = useContext(Context)

    useEffect(() => {
        getMyComments(user.user.id).then(data => {
            setComments(data.reverse())
        })
    }, [])
    
  return (
    <>
            {comments.map((c) => 
                <Card className='mb-3' key={c.id}>
                    <Card.Header className='d-flex' onClick={() => navigate(`/device/${c.deviceId}`)}
                     style={{backgroundColor: 'lightcyan', cursor: 'pointer'}}>
                        <Col>
                            <h5>{user.user.userName}</h5>
                            <i>{c.createdAt}</i>
                        </Col>
                         <Col className='d-flex justify-content-end'>
                            <Button onClick={() => console.log('delete')}
                             className='ml-auto' variant='outline-danger'>
                                <Image src={TrashIcon}/>
                            </Button>
                        </Col>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                        {c.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            </>
  )
})

export default MyComments