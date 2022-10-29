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
import { useSearchParams } from 'react-router-dom'

const Shop = observer(() => {
  const [searchValue, setSearchValue] = useState('')

  const {device} = useContext(Context)
  const {basket} = useContext(Context)
  const {user} = useContext(Context)
  const [searchParams, setSearchParams] = useSearchParams()

  const search = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    e?.stopPropagation()

    device.setSelectedBrand([])
    device.setSelectedType(null)

    setSearchParams({page: device.page.toString(), searchValue})

    fetchDevices(undefined, undefined, device.page, device.limit, searchValue).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })
  }

  useEffect(() => {

    //const parsed = queryString.parse(navigate.location)
    const params = Object.fromEntries(Array.from(searchParams))
    device.setPage(Number(params.page) ? Number(params.page) : 1)


    if(params.typeId) {
        device.setSelectedType({createdAt: '', id: Number(params.typeId), name: '', updatedAt: ''})
    }

    if(params.searchValue){
      setSearchValue(params.searchValue)
      search()
    }

    fetchTypes().then(data => {
      device.setTypes(data)
    })
    fetchBrands().then(data => {
      device.setBrands(data)
    })
    fetchDevices(undefined, undefined, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
    })

    return () => {
      device.setSelectedBrand([])
      device.setSelectedType(null)
    }
    
  }, [device])

  useEffect(() => {

    if(!searchValue && !device.selectedType?.id)setSearchParams({page: device.page.toString()})
    else if (!device.selectedType?.id) setSearchParams({page: device.page.toString(), searchValue})
    else setSearchParams({page:device.page.toString(), typeId: device.selectedType.id.toString()})

    let brandIds = []
    for (let i = 0; i < device.selectedBrand.length; i++) {
      brandIds.push(device.selectedBrand[i].id)      
    }

    if (brandIds.length === 0) brandIds = []

      fetchDevices(device.selectedType?.id, brandIds, device.page, device.limit, searchValue).then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      })
      if(user.isAuth){getBasketDevices().then(data => {
        basket.setBasketDevices(data.devices)
      })}
  }, [device.page, device.selectedBrand, device.selectedType])

  useEffect(() => {
    
    //device.setPage()
    
  }, [searchParams])
  
  
  

  return (
    <Container>
        <Row className="mt-3">
            <Col md={3} className='d-flex flex-column'>
              <Row className=''><TypeBar/></Row>
              <Row className='mt-2'><BrandBar /></Row>
            </Col>
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

                <Pages />
                <DeviceList />
                <Pages />

            </Col>
        </Row>
    </Container>
  )
})

export default Shop