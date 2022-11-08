import React, { useContext } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import { deviceTypeType } from '../types/types'
import { Skeleton } from '@mui/material'

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    let skeletonItems = []

    for (let i = 0; i < 10; i++) {
      skeletonItems.push(i)
    }

    const selectType = (type: deviceTypeType) => {
      if(type !== device.selectedType) {
        device.setSelectedType(type)
      } else {
        device.setSelectedType(null)
      }
    }

  return (
    <Card>
    <Card.Header>Тип товара</Card.Header>
        {device?.types.length > 0 
        ? <ListGroup>
        {device.types.map(type => 
            <ListGroup.Item key={type.id}
             style={{cursor: 'pointer'}}
             active={device.selectedType?.id === type.id}
             onClick={() => selectType(type)}>
                {type.name}
            </ListGroup.Item>)}
        </ListGroup> 
        : <ListGroup>
            {skeletonItems.map((item, index) => <ListGroup.Item key={index}>
              <Skeleton style={{fontSize: 20}} variant="text"/>
            </ListGroup.Item>)}
        </ListGroup>}
    </Card>
  )
})

export default TypeBar