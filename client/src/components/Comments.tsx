import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Form, Button, Card, Image, Col } from 'react-bootstrap'
import { addComment, getComments, removeComment } from '../api/commentsApi'
import { Context } from '../index'
import TrashIcon from '../assets/trash3.svg'
import RefreshIcon from '../assets/refresh.svg'
import { Avatar } from '@mui/material'
import { commentType } from '../types/types'

type CommentsProps = {
    deviceId: number
}

const Comments = observer(({deviceId}: CommentsProps) => {
    const {device} = useContext(Context)
    const {user} = useContext(Context)
    const [value, setValue] = useState('')
    const [isInvalid, setIsInvalid] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<boolean>(false)
    const [toLoadMore, setToLoadMore] = useState<boolean>(false)
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [buttonStatus, setButtonStatus] = useState<string>('')

    const [commentCount, setCommentCount] = useState<number>(0)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [deletedAmount, setDeletedAmount] = useState<number>(0)


    const postComment = () => {
        if(value) {
            addComment(deviceId, value).then(data => {
                getComments(deviceId).then(d => {
                    if(commentCount + 1 === d.count && !toLoadMore) {
                        device.addComment(data)
                        setDeletedAmount(deletedAmount - 1)
                        setCommentCount(commentCount + 1)
                    }
                    else {
                        device.setComments(d.comments)
                        setPage(1)
                        setDeletedAmount(0)
                        setCommentCount(d.count)
                        setIsHidden(false)
                    }
                })
            })
            setValue('')
            setButtonStatus('')
        }
        else setIsInvalid(true)
    }

    const deleteComment = (deviceId: number, commentId: number) => {
        setIsDisabled(true)
        console.log(deletedAmount)
        if(device.comments.length - 1 === 0) setIsHidden(true)
        removeComment(deviceId, commentId).then(data => {
            setTimeout(() => {
                getComments(deviceId).then(d => {
                    if(commentCount - 1 === d.count) {
                     console.log('true')
                         device.deleteComment(commentId)
                         setDeletedAmount(deletedAmount + 1)
                         setCommentCount(commentCount - 1)
                    }
                    else{
                     console.log('false')
                         device.deleteComment(commentId)
                         setToLoadMore(true)
                    }               
                 })
                setIsDisabled(false)
            }, 500);
        })
        
    }

    const fetchComments = () => {
        const pageCount = Math.ceil((commentCount + deletedAmount) / limit)
        console.log(pageCount)

        if(page < pageCount) {
            setPage(page + 1)
            if(page === pageCount - 1) setIsHidden(true)
            getComments(deviceId, page + 1, limit, deletedAmount).then(data => {
                if(data.count === commentCount) device.pushComments(data.comments)
                else {
                    getComments(deviceId, page + 1, limit, deletedAmount + (commentCount - data.count)).then(d => {
                        device.pushComments(d.comments)
                        setCommentCount(d.count)
                        setDeletedAmount(deletedAmount + (commentCount - data.count))
                        setToLoadMore(true)
                    })
                }
            })
        }

    }

    const updateComments = () => {
        getComments(deviceId, 1, limit).then(data => {

            if(commentCount !== data.count) setButtonStatus(`${data.count - commentCount} комментарий(ев)`)
            else setButtonStatus('Обновлено...')

            device.setComments(data.comments)
            setCommentCount(data.count)

            setPage(1)
            setDeletedAmount(0)

            const pageCount = Math.ceil(commentCount / limit)
            if(pageCount > 1)setIsHidden(false)

        })
    }



    useEffect(() => {
        getComments(deviceId, page, limit, deletedAmount).then(data => {
            device.setComments(data.comments)
            setCommentCount(data.count)
        })
        
    }, [])

    useEffect(() => {
        const pageCount = Math.ceil(commentCount / limit)

        if(pageCount === page) setIsHidden(true)
    }, [commentCount])
    


  return (
    <div>
        {user.isAuth &&
        <Form>
            <Form.Control as='textarea' isInvalid={isInvalid} value={value} onChange={(e) => {
                setValue(e.target.value)
                setIsInvalid(false)
                }
            }
             placeholder='Написать комментарий'/>
            <Col style={{display: 'flex', justifyContent: "space-between"}}>
                <Button className="mt-2" onClick={postComment} variant='outline-primary'>Отправить</Button>
                <Button className="mt-2" onClick={updateComments} variant='outline-info'><Image src={RefreshIcon}/>{buttonStatus}</Button>
            </Col>
        </Form>
        }

        <div className="mt-10">
        {commentCount 
            ?
            <>
            {device.comments.map((c: commentType) => {
                const date = c.comment.createdAt.split('T')
                const serverTime = date[1].split('.')
                let hour = serverTime[0].split(':')
                hour[0] = (Number(hour[0]) + 3).toString()
                let localTime = hour.toString()
                localTime = localTime.replaceAll(',', ':')

                return <Card className='mt-3' key={c.comment.id}>
                    <Card.Header className='d-flex' style={{backgroundColor: c.comment.userId === user.user.id ? 'lightcyan' : ''}}>
                        <Col>
                            <Col style={{display: 'flex', alignItems: 'center', gap: '7px'}}><Avatar sx={{height: '58px', width: '58px'}} src={`${process.env.REACT_APP_BASE_URL}profilePics/${c.img}`}>test</Avatar><h5 style={{marginTop: 5}}>{c.userName}</h5></Col>
                            <i>{date[0]}</i>
                            <i>{`\n | \n${localTime}`}</i>
                        </Col>
                        {(c.comment.userId === user.user.id || user.user.role === 'ADMIN') && <Col className='d-flex justify-content-end'>
                            <Button disabled={isDisabled} onClick={() => deleteComment(c.comment.deviceId, c.comment.id)}
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
            <div className='d-grid mt-4' style={{backgroundColor: 'lightgray', borderRadius: '10px'}}>
                <Button hidden={isHidden} onClick={() => fetchComments()}
                 variant='outline-secondary' size='lg'>Загрузить ещё...</Button>
            </div>
            </>
            :
            <p>Комментариев нет! Будьте первым, кто оставит отзыв!</p>
        }
        </div>
    </div>
  )
})

export default Comments