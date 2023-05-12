import { useEffect, useState } from "react";
import "./Game.css";
import { Link } from "react-router-dom";

import { Button, Modal } from "@mui/material/";

export const Game = ({ game, onGameClick }) => {
  return (
    <>
      <div>{game?.title}</div>
      <img src={game?.gameImg}></img>
      <Button
        onClick={() => onGameClick(game?.id)}
        variant="contained"
        color="primary"
      >
        Open
      </Button>
    </>
  );
};

