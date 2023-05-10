import { useState } from "react";
import { Button, Modal } from "@mui/material/";
import { Link } from "react-router-dom";
import "./PopupModal.css";

export const ActiveGameModal = ({ game, closeModal }) => {
  const [openModal, setOpenModal] = useState(false);

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
            <img src={game.img} alt={game.title} />
            <p id="modal-description" className="popup-modal-description">
              {game.description}
            </p>
            <p id="modal-description" className="popup-modal-description">
              {game.genre}
            </p>
            <p id="modal-description" className="popup-modal-description">
              {game.rating}
            </p>

            <Link to={`/Games/play/${game.id}`} className="item">
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
