import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import {Context} from '../index'
import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../api/deviceApi'
import Pages from '../components/Pages'

const Shop = observer(() => {
  const {device} = useContext(Context)

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

    return () => {
      device.setSelectedBrand({})
      device.setSelectedType({})
    }
    
  }, [])

  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }, [device.page, device.selectedBrand, device.selectedType])
  
  

  return (
    <Container>
        <Row className="mt-3">
            <Col md={3}><TypeBar/></Col>
            <Col md={9}>
                <BrandBar />
                <DeviceList />
                <Pages />
            </Col>
        </Row>
    </Container>
  )
})

export default Shop