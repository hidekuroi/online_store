import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../index'
import { Col, Container, Row, Form, InputGroup, Button, Dropdown, Image } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import TypeBar from '../components/TypeBar'
import { fetchBrands, fetchDevices, fetchTypes } from '../api/deviceApi'
import Pages from '../components/Pages'
import { getBasketDevices } from '../api/basketApi'
import { useSearchParams } from 'react-router-dom'

import sortDown from '../assets/sort-down.svg'
import sortUp from '../assets/sort-up.svg'

const Shop = observer(() => {
  const [searchValue, setSearchValue] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [order, setOrder] = useState('ASC')

  const {device} = useContext(Context)
  const {basket} = useContext(Context)
  const {user} = useContext(Context)
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFetching, setIsFetching] = useState<boolean>(false)

  const search = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    e?.stopPropagation()

    

    setSearchParams({page: device.page.toString(), searchValue})

    setIsFetching(true)

    fetchDevices(undefined, undefined, device.page, device.limit, searchValue).then(data => {
      

      console.log(data.count !== 0)
      if(data.count !== 0) {
        setIsFetching(false)
        device.setSelectedBrand([])
        device.setSelectedType(null)
        setOrderBy('')
        setOrder('ASC')

        device.setDevices(data.rows)
        device.setTotalCount(data.count)
      }
      else {
        setTimeout(() => {
          setIsFetching(false)

          device.setDevices(data.rows)
          device.setTotalCount(data.count)
        }, 800);
      }
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

    if(params.orderBy) {
      setOrderBy(params.orderBy)
    }

    if(params.order) {
      setOrder(params.order)
    }

    setIsFetching(true)

    fetchTypes().then(data => {
      device.setTypes(data)
    })
    fetchBrands().then(data => {
      device.setBrands(data)
    })
    fetchDevices(undefined, undefined, device.page, device.limit).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)

      setIsFetching(false)
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

    if(orderBy){
      if(device.selectedType?.id) setSearchParams({page:device.page.toString(), orderBy, order, typeId: device.selectedType.id.toString() })
      else if(searchValue) setSearchParams({page:device.page.toString(), orderBy, order, searchValue})
      else setSearchParams({page:device.page.toString(), orderBy, order })
    }

    if(order && order !== 'ASC' && !orderBy) {
      if(device.selectedType?.id) setSearchParams({page:device.page.toString(), order, typeId: device.selectedType.id.toString() })
      else if(searchValue) setSearchParams({page:device.page.toString(), order, searchValue})
      else setSearchParams({page:device.page.toString(), order })
    }

    let brandIds = []
    for (let i = 0; i < device.selectedBrand.length; i++) {
      brandIds.push(device.selectedBrand[i].id)      
    }

    if (brandIds.length === 0) brandIds = []

    device.setDevices([])
    setIsFetching(true)

      fetchDevices(device.selectedType?.id, brandIds, device.page, device.limit, searchValue, orderBy, order).then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
        setIsFetching(false)
      })
      if(user.isAuth){getBasketDevices().then(data => {
        basket.setBasketDevices(data.devices)
      })}
  }, [device.page, device.selectedBrand, device.selectedType, orderBy, order])

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

              <Col className='mb-3'>
                <h2>{device.selectedType ? device.selectedType.name : 'Все устройства'}</h2>
              </Col>

              <Form onSubmit={search} className='mt-2 mb-2'>
                <InputGroup size='lg' className="">
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


              <Col style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Pages />
                
              <Row style={{display: 'flex', alignItems: 'center'}}>
                <Col>
                <Dropdown className='mt-2 mb-2'>
                  <Dropdown.Toggle variant="outline-primary">
                    {orderBy === 'price' && 'Цена' || orderBy === 'rating' && 'Рейтинг' || "По умолчанию"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {
                        setOrderBy('')
                        setOrder('ASC')
                        device.setPage(1)
                      }}
                      >По умолчанию</Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setOrderBy('price')
                        setOrder('ASC')
                        setSearchParams({page: '1',orderBy: 'price'})
                        device.setPage(1)
                      }}
                      >Цена</Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setOrderBy('rating')
                        setOrder('DESC')
                        device.setPage(1)
                      }}
                      >Рейтинг</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </Col>
                <Col>
                  <Button 
                  onClick={() => {
                    device.setPage(1)

                    if(order === 'DESC')setOrder('ASC')
                    else setOrder('DESC')
                  }}
                  variant='outline-primary'>
                    {order === 'DESC' 
                    ?
                    <Image src={sortDown} />
                    :
                    <Image src={sortUp} />
                    }
                    
                  </Button>
                </Col>
                </Row>

              </Col>

                <DeviceList isFetching={isFetching} />
                <Pages />

            </Col>
        </Row>
    </Container>
  )
})

export default Shop