import { useState } from "react";
import { Button, Modal } from "@mui/material/";
import { Link } from "react-router-dom";
import "./PopupModal.css";

export const ActiveGameModal = ({ game, closeModal }) => {
  const [openModal, setOpenModal] = useState(false);

  function Item({ url, title }) {
    function handleClick() {
      window.open(url, "_blank");
    }

    return (
      <div>
        <h2>{title}</h2>
        <button onClick={handleClick}>Open in new tab</button>
      </div>
    );
  }

  return (
    <>
      <Modal
        open={true}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className={`popup-modal-container`}>
          <div className="popup-modal-content">
            <h2 id="modal-title" className="popup-modal-title">
              {game.title}
            </h2>
            <img src={game.gameImg} alt={game.title} />
            <p id="modal-description" className="popup-modal-description">
              Description: {game.description}
            </p>
            <p id="modal-description" className="popup-modal-description">
              Genre: {game.genre}
            </p>
            <p id="modal-description" className="popup-modal-description">
              Rating: {game.rating}
            </p>

            <Link
              to={`/Games/play/${game.id}`}
              target="_blank"
              className="item"
            >
              <Button variant="contained" color="primary">
                Play Game
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};
