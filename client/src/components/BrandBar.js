import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Row, Card, Col, Form } from 'react-bootstrap'
import {Context} from '../index'

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    const selectBrand = (brand) => {
      //if(brand !== device.selectedBrand) {
        //device.pushSelectedBrand(brand)
      //} else {
       // device.setSelectedBrand({})
     // }
      let count = 0

      for (let k = 0; k < device.selectedBrand.length; k++) {
        if(brand !== device.selectedBrand[k]) count = count
        else count++      
      }

      if(count === 0) device.pushSelectedBrand(brand)
      else device.setSelectedBrand(device.selectedBrand.filter(br => br !== brand))
    }

  return (
    <Row className="d-inline-flex">
      <Form>
        <Card >
        <Card.Header>Бренды</Card.Header>
        <div key={`default-checkbox`} className="m-2" style={{height: 150, overflowY: 'auto'}}>
          {device.brands.map(brand => {

            let isChecked = false
            for (let i = 0; i < device.selectedBrand.length; i++) {
              if(brand.id === device.selectedBrand[i].id) isChecked = true              
            }

            return <Form.Check 
            type={'checkbox'}
            id={brand.id}
            label={brand.name}
            checked={isChecked}
            onChange={() => selectBrand(brand)}
          />
          })}
        </div>
        </Card>
      </Form>


        {/* {device.brands.map(brand => {
            let isBorder = false
            for (let i = 0; i < device.selectedBrand.length; i++) {
              if(brand.id === device.selectedBrand[i].id) isBorder = true              
            }


            return <Col><Card key={brand.id}
             className='p-3'
             style={{cursor: 'pointer'}}
             onClick={() => selectBrand(brand)}
             border={isBorder ? 'primary' : 'default'}>
                {brand.name}
            </Card></Col>
      })} */}
    </Row>
  )
})

export default BrandBar