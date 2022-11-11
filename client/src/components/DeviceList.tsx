import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import {Context} from '../index'
import {Row} from 'react-bootstrap'
import DeviceItem from './DeviceItem'

type DeviceListPropsType = {
  isFetching: boolean
}

const DeviceList = observer(({isFetching}: DeviceListPropsType) => {
    const {device} = useContext(Context)

    let skeletonItems = []

    for (let i = 0; i < 16; i++) {
      skeletonItems.push(i)
    }    

  return (
    <Row className='d-flex'>
      {device.devices.length > 0
        ?
        <>
        {device.devices.map(d => {

            let brandname = ''
            device.brands.map((b) => b.id === d.brandId && (brandname = b.name))

            return <DeviceItem key={d.id} device={d}
            brand={brandname}
            />
            }
            )}
        </>
        :
        <>
          <Row className='d-flex'>
            {
              isFetching 
            ?
              skeletonItems.map((item, index) => {return <DeviceItem key={index} />})
            :
              <>
                <hr className='mt-4'/>
                <h3 className="mt-2 ml-2">Не найдено устройств по заданным критериям</h3>
              </>
            }
              
          </Row>
          
        </>    
    }
    </Row>
    )
})

export default DeviceList