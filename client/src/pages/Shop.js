import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../index'
import { Col, Container, Row, Form, InputGroup, Button } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../api/deviceApi'
import Pages from '../components/Pages'
import { getBasketDevices } from '../api/basketApi'

const Shop = observer(() => {
  const [searchValue, setSearchValue] = useState('')

  const {device} = useContext(Context)
  const {basket} = useContext(Context)
  const {user} = useContext(Context)

  const search = (e) => {
    e.preventDefault()
    e.stopPropagation()

    device.setSelectedBrand({})
    device.setSelectedType({})

    fetchDevices(null, null, device.page, device.limit, searchValue).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }

  useEffect(() => {
    fetchTypes().then(data => {
      device.setTypes(data)
    })
    fetchBrands().then(data => {
      device.setBrands(data)
    })
    fetchDevices(null, null, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
    if(user.isAuth){getBasketDevices().then(data => {
      basket.setBasketDevices(data)
    })}

    return () => {
      device.setSelectedBrand({})
      device.setSelectedType({})
    }
    
  }, [])

  useEffect(() => {
      fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit, searchValue).then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      })
      if(user.isAuth){getBasketDevices().then(data => {
        basket.setBasketDevices(data)
      })}
  }, [device.page, device.selectedBrand, device.selectedType])
  
  

  return (
    <Container>
        <Row className="mt-3">
            <Col md={3}><TypeBar/></Col>
            <Col md={9}>

              <Form onSubmit={search} className='mt-2 mb-4'>
                <InputGroup size='lg' className="mb-3">
                  <Form.Control value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Поиск устройства"
                    aria-label="Поиск устройства"
                    aria-describedby="basic-addon2"
                  />
                  <Button type='submit' variant="outline-primary" id="button-addon2">
                    Найти
                  </Button>
                </InputGroup>
              </Form>

                <BrandBar />
                <DeviceList />
                <Pages />
            </Col>
        </Row>
    </Container>
  )
})

export default Shop