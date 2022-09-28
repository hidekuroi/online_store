import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Row, Card, Col } from 'react-bootstrap'
import {Context} from '../index'

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    const selectBrand = (brand) => {
      if(brand !== device.selectedBrand) {
        device.setSelectedBrand(brand)
      } else {
        device.setSelectedBrand({})
      }
    }

  return (
    <Row className="d-inline-flex">
        {device.brands.map(brand => 
            <Col><Card key={brand.id}
             className='p-3'
             style={{cursor: 'pointer'}}
             onClick={() => selectBrand(brand)}
             border={brand.id === device.selectedBrand.id ? 'primary' : 'default'}>
                {brand.name}
            </Card></Col>
            )}
    </Row>
  )
})

export default BrandBar