import React, { useContext } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    const selectType = (type) => {
      if(type !== device.selectedType) {
        device.setSelectedType(type)
      } else {
        device.setSelectedType({})
      }
    }

  return (
    <Card>
    <Card.Header>Тип товара</Card.Header>
    <ListGroup>
        {device.types.map(type => 
            <ListGroup.Item key={type.id}
             style={{cursor: 'pointer'}}
             active={device.selectedType?.id === type.id}
             onClick={() => selectType(type)}>
                {type.name}
            </ListGroup.Item>)}
    </ListGroup>
    </Card>
  )
})

export default TypeBar