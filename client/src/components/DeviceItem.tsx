import React, { useState } from 'react'
import { Card, Col, Image } from 'react-bootstrap'
import star from '../assets/star.svg'
import {Link} from 'react-router-dom'
import { DEVICE_ROUTE } from '../utils/consts'
import BasketButton from './BasketButton'
import classes from './DeviceItem.module.css'
import { minDeviceDataType } from '../types/types'
import { Skeleton } from '@mui/material'
import useImageLoaded from '../hooks/useImageLoaded'

type DeviceItemPropsType = {
    device?: minDeviceDataType,
    brand?: string
}

const DeviceItem = ({device, brand}: DeviceItemPropsType) => {

    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false)

    const onLoad = () => {
        setIsImageLoaded(true)
        console.log(device?.name)
    }

  return (
    <Col md={3} className='mt-3'>
        <Card style={{border: 'light'}} className={`${classes.item}`}>
            <Link to={`${DEVICE_ROUTE}/${device?.id}`}>
                {/* @ts-ignore */}
		    {(device) ? 
            <>
            <Card.Img as={'img'} onLoad={onLoad} className='m-auto' style={{cursor: 'pointer', display: isImageLoaded ? '' : 'none'}}
			    src={process.env.REACT_APP_BASE_URL + device.img} />
            {!isImageLoaded && <Skeleton variant="rectangular"  height={'200px'}/>}
            </>
             :
			<Skeleton variant="rectangular"  height={'200px'}/>
		    }
            </Link>
            <Card.Body>
                <Card.Text style={{marginBottom: -3, color: 'gray', marginTop: -10}}>{brand ? brand : <Skeleton style={{fontSize: '0.9rem'}} width={'65%'} variant="text"/>}</Card.Text>
                <Card.Title>
                    {device?.name 
                    ?
                    <Link style={{textDecoration: 'none', color: 'black'}} to={`${DEVICE_ROUTE}/${device?.id}`}>{device?.name}</Link>
                    :
                    <Skeleton style={{fontSize: '1.8rem'}} variant="text"/>
                    }
                </Card.Title>
                <Card.Text style={{fontWeight: 'bold', fontSize: 24}}>{
                device?.price 
                ? 
                `${device?.price}$`
                :
                <Skeleton style={{fontSize: 26, width: '50%'}} variant="text"/>
                }</Card.Text>
                <Card.Text className='d-flex align-items-center'>
                    {device ? <>
                        {Math.floor((device?.rating || 0) * 100) / 100}
                        <img src={star} alt="Rating" width="14" height="14" />
                    </>
                    :
                    <Skeleton style={{fontSize: 18, width: '20%'}} variant="text"/>
                    }
                </Card.Text>
                {device 
                ? <BasketButton deviceId={device?.id}/> 
                : <Skeleton style={{height: 34, width: '50%'}} variant="rounded"/>}
            </Card.Body>
        </Card>
    </Col>
  )
}

export default DeviceItem
