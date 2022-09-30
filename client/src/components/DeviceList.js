import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Context} from '../index'
import {Row} from 'react-bootstrap'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
    const {device} = useContext(Context)

  return (
    <Row className='d-flex'>
      {device.devices.length > 0
        ?
        <>
        {device.devices.map(d => 
            <DeviceItem key={d.id} device={d}
            brand={device.brands.map((b) => b.id === d.brandId && b.name)}
            />
            )}
        </>
        :
        <>
          <hr className='mt-4'/>
          <h3 className="mt-2 ml-2">Не найдено устройств по заданным критериям</h3>
        </>    
    }
    </Row>
    )
})

export default DeviceList