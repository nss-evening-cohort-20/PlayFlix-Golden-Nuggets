import { useEffect, useState } from "react";
import "./Game.css";
import { Link } from "react-router-dom";

import { Button, Modal } from "@mui/material/";

export const Game = ({ game, onGameClick }) => {
  return (
    game && (
      <>
        <div className="item">
          <Link>
            <img src={game.gameImg} onClick={() => onGameClick(game.id)}></img>
          </Link>
        </div>

        {/* <Button
        

        variant="contained"
        color="primary"
      >
        Open
      </Button> */}
      </>
    )
  );
};
