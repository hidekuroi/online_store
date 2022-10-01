import React from 'react'
import { ListGroup, Image, Badge, Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const BasketItem = ({d, brand, deleteBasketItem}) => {
    const navigate = useNavigate()

  return (
    <ListGroup.Item as='li'
      className="d-flex justify-content-berween align-items-start"
      >
        <Image style={{marginLeft: 10, cursor: 'pointer'}} width={150} onClick={() => navigate(`/device/${d.deviceInfo.id}`)}
         src={process.env.REACT_APP_BASE_URL + d.deviceInfo.img}/>
        <div className='ms-2 me-auto'>
          <div className='fw-bold' onClick={() => navigate(`/device/${d.deviceInfo.id}`)}
           style={{fontSize: 20, cursor: 'pointer'}}>{d.deviceInfo.name}</div>
           {brand}
        </div>
        <Badge className="align-items-center"
         style={{width: 100, height: 35, fontSize: 18, cursor: 'pointer'}} bg='success'>
          {d.deviceInfo.price}$
        </Badge>
        <Button onClick={() => deleteBasketItem(d.basketDeviceId)}
         className='alignt-items-center'
         style={{height: 35, marginLeft: 5}} variant='outline-danger'>X</Button>
      </ListGroup.Item>
  )
}

export default BasketItem