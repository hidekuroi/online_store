import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Pagination } from 'react-bootstrap'
import { Context } from '../index'

const Pages = observer(() => {
    const {device} = useContext(Context)
    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let p = 0; p < pageCount; p++) {
        pages.push(p + 1)
    }
    
    
  return (
    <Pagination className='mt-3'>
        {pages.map((page) => 
        <Pagination.Item key={page} active={device.page === page}
        onClick={() => device.setPage(page)}
        >
            {page}
        </Pagination.Item>
        )}
    </Pagination>
  )
})

export default Pages