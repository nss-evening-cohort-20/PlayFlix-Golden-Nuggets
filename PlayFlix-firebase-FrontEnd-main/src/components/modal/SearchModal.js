import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

export const ModalComponent = ({ modalOpen, setModalOpen, setReturnedGames, returnedGames, searchParams }) => {
const [games, setGames] = useState([])
    const handleClose = () => {
        setModalOpen(false)
        setReturnedGames([])
    }

    useEffect(() => {
        const modalGames = returnedGames.map((games) => {
           return games
        })
        setGames(modalGames)
        
    }, [returnedGames])
    
    
    const searchTitle = searchParams
    const newSearchTitle = searchTitle.charAt(0).toUpperCase() + searchTitle.slice(1)
        
    

    return (
        <>
            <Modal show={modalOpen}
                onHide={handleClose}
                >
                <Modal.Header closeButton={handleClose}>
                    <Modal.Title>Searching For: {newSearchTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display: "inline-block"}}>
                    {
                        games.map((game) => {
                            return (
                                <Card style={{width: "18rem", margin: "auto"}} key={`game--${game.id}`}>
                                    <Card.Img  src={game.gameImg}></Card.Img>
                                    <Card.Body>
                                        <Card.Title>{game.title}</Card.Title>
                                        <Card.Text>{game.description}</Card.Text>
                                        <Button style={{width: "100%"}} variant="primary" size="lg" onClick={() => {
                                            handleClose()}}
                                        >Save To Favorites</Button>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}