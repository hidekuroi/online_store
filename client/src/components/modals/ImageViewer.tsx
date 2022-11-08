import React from 'react'
import { Modal, Image, Col, Row, Button } from 'react-bootstrap'
import './ImageViewer.css'

type imageViewerProps = {
    src: string,
    show: boolean,
    onHide: () => void
}

const ImageViewer = ({src, show, onHide}: imageViewerProps) => {
  return (
    <Modal style={{
     backgroundColor: 'rgba(0, 0, 0, 0.70)',
     opacity: '1',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'space-between',
     }} centered 
      show={show} size='lg' onHide={() => onHide()} dialogClassName={'modal90w'}>
        <Col style={{display: 'flex', justifyContent: 'space-between', opacity: '1'}}>
            <Image style={{height: '100%', width: '100%', backgroundColor: 'rgba(100, 100, 100, 0.4)'}} src={src}/>
        </Col>
    </Modal>
  )
}

export default ImageViewer