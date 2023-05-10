import { useEffect, useState } from "react";
import { Button, Card, Modal, Row, Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const ModalComponent = ({ modalOpen, setModalOpen, setReturnedGames, returnedGames, searchParams }) => {
    const [addToFavorites, setAddToFavorites] = useState({})
    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const handleClose = () => {
        setModalOpen(false)
        setReturnedGames([])

    }

    const addToFaveDB = async () => {
        const toDbObj = {
            gameId: addToFavorites.id,
            userId: 1
        }
        const post = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toDbObj)
        }
        const req = await fetch(`https://localhost:7215/api/FavoriteGames`, post)
        const resp = await req.json()
        navigate("/")
    }

    useEffect(() => {
        const modalGames = returnedGames.map((games) => {
            return games
        })
        setGames(modalGames)

    }, [returnedGames])


    const searchTitle = searchParams
    const newSearchTitle = searchTitle.charAt(0).toUpperCase() + searchTitle.slice(1)

    const handleClick = (game, gameId) => {
       const addToFave = games.find((game) => {
            return game.id === gameId
        })
        setAddToFavorites(addToFave)
        addToFaveDB()
    }

    return (
        <>
            <Modal
                show={modalOpen}
                onHide={handleClose}
                size="lg"
            >
                <Modal.Header closeButton={handleClose}>
                    <Modal.Title>Searching For: {newSearchTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        games.length > 0 ?
                            <Row style={{ margin: "auto" }}>
                                {

                                    games.map((game) => {
                                        return (
                                            <Card key={`game--${game.id}`} style={{ width: "20rem", margin: "auto" }} >
                                                <Card.Img style={{ height: "10rem" }} src={game.gameImg}></Card.Img>
                                                <Card.Body>
                                                    <Card.Title>{game.title}</Card.Title>
                                                    <Card.Text>{game.description}</Card.Text>
                                                    <Button style={{ width: "100%" }} variant="primary" size="lg" onClick={() => {
                                                        handleClick(game, game.id)
                                                    }}
                                                    >Save To Favorites</Button>
                                                </Card.Body>
                                            </Card>
                                        )
                                    })

                                }
                            </Row>
                            :
                            "Game not found sadge"
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}