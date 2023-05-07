import { Button, Modal } from "react-bootstrap";

export const ModalComponent = ({searchParams, modalOpen, setModalOpen}) => {
    const handleClose = () => setModalOpen(false)
    let SearchTitle = searchParams;
    return (
        <>
            <Modal show={modalOpen} onHide={handleClose}>
                <Modal.Header closeButton={handleClose}>
                    <Modal.Title>Searching For: {SearchTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        handleClose()}}
                    >Save To Favorites</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}