import React, { useState } from 'react';
import { Button, Modal } from '@mui/material/';
import './PopupModal.css';


  const PopupModal = () => {
    const [openSonic, setOpenSonic] = useState(false);
    const [openMario, setOpenMario] = useState(false);
  
    const handleOpenSonic = () => {
      setOpenSonic(true);
    };
  
    const handleCloseSonic = () => {
      setOpenSonic(false);
    };
  
    const handleOpenMario = () => {
      setOpenMario(true);
    };
  
    const handleCloseMario = () => {
      setOpenMario(false);
    };
  
    return (
      <>
        <div>
          <img
            src="https://info.sonicretro.org/images/thumb/0/08/Sonicclassicheroes.png/320px-Sonicclassicheroes.png"
            alt="Sonic"
            onClick={handleOpenSonic}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/3/3c/Super_Mario_All_Stars_%28game_box_art%29.jpg"
            alt="Mario"
            onClick={handleOpenMario}
          />
        </div>
        <Modal
          open={openSonic}
          onClose={handleCloseSonic}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className={`popup-modal-container`}>
            <div className="popup-modal-content">
              <h2 id="modal-title" className="popup-modal-title">
                Sonic Modal Title
              </h2>
              <img
          src="https://info.sonicretro.org/images/thumb/0/08/Sonicclassicheroes.png/320px-Sonicclassicheroes.png"
          alt="Sonic"
        />
              <p id="modal-description" className="popup-modal-description">
                Hedgey goes fast
              </p>
              <Button variant="contained" color="primary" >
        Open Game
      </Button>
            </div>
          </div>
        </Modal>
        <Modal
          open={openMario}
          onClose={handleCloseMario}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className={`popup-modal-container`}>
            <div className="popup-modal-content">
              <h2 id="modal-title" className="popup-modal-title">
                Mario Modal Title
              </h2>
              <img
          src="https://upload.wikimedia.org/wikipedia/en/3/3c/Super_Mario_All_Stars_%28game_box_art%29.jpg"
          alt="Sonic"
          
        />
              <p id="modal-description" className="popup-modal-description">
                Plumber
              </p>
              <Button variant="contained" color="primary">
        Open Game
      </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  };
  
  export default PopupModal;