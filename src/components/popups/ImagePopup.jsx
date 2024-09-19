import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function ImagePopup({show, close, url, title}) {
  return (
    <div>
         <Modal show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={url} alt="" className="w-100 rounded-4" />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
          
        </Modal.Footer> */}
      </Modal>
    </div>
  )
}

export default ImagePopup