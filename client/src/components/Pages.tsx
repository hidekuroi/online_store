import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

type PagesProps = {
  isFetching: boolean
}

const Pages = observer(({isFetching}: PagesProps) => {
    const [leftEllipse, setLeftEllipse] = useState<boolean>(false)
    const [rightEllipse, setRightEllipse] = useState<boolean>(false)

    const {device} = useContext(Context)
    const pageCount: number = Math.ceil(device.totalCount / device.limit)
    let pages: number[] = []

    if(pageCount <= 7) {
        for (let p = 0; p < pageCount; p++) {
            pages.push(p + 1)
        }
    }
    if(device.page <= 4 && pageCount > 7) {
        pages = []

        for (let p = 0; p < 6; p++) {
            pages.push(p + 1)
        }
        pages.push(pageCount)
    }
    if(device.page > 4 && (device.page < pageCount - 3)) {
        pages = []

        pages.push(1)
        for (let p = device.page - 3; p < device.page + 2; p++) {
            pages.push(p + 1)
        }
        pages.push(pageCount)
    }
    if(device.page >= pageCount - 3 && pageCount > 7) {
        pages.push(1)
        for (let p = pageCount - 6; p < pageCount; p++) {
            pages.push(p + 1)            
        }
    }

    useEffect(() => {
      if(pageCount <= 7) {
        setLeftEllipse(false)
        setRightEllipse(false)
      }
      if(device.page <= 4 && pageCount > 7){
        setLeftEllipse(false)
        setRightEllipse(true)
      }
      if(device.page > 4 && (device.page < pageCount - 3)){
        setLeftEllipse(true)
        setRightEllipse(true)
      }
      if(device.page >= pageCount - 3 && pageCount > 7){
        setLeftEllipse(true)
        setRightEllipse(false)
      }
    }, [device.page, pageCount])
    

    
  return (
    <Pagination className='mt-3'>

      <Pagination.Prev onClick={() => {
        device.setPage(device.page-1)
        }} disabled={isFetching || device.page === 1} hidden={pageCount <= 1}/>

        {pages.map((page, index) => 
        <>
          {(index + 1 === pages.length) && <Pagination.Ellipsis hidden={!rightEllipse}/>}
          <Pagination.Item disabled={isFetching} key={page} active={device.page === page}
          onClick={() => {
            device.setPage(page)
          }}
          >
              {page}
          </Pagination.Item> 
          {(index + 1 === 1) && <Pagination.Ellipsis hidden={!leftEllipse}/>}
        </>
        )}

      <Pagination.Next onClick={() => {
        device.setPage(device.page+1)
        }} disabled={isFetching || device.page === pageCount} hidden={pageCount <= 1}/>

    </Pagination>
  )
})

export default Pages