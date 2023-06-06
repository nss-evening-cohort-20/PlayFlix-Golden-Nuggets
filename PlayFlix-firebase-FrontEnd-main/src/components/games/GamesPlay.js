import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import "./Game.css";

function IframeComponent({ iframeString }) {
  return <div dangerouslySetInnerHTML={{ __html: iframeString }} />;
}
export const GamePlay = () => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [game, updateGame] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://localhost:7215/api/Games/id/${gameId}`
      );
      const singleGame = await response.json();
      updateGame(singleGame);
    };
    fetchData();
  }, [gameId]);

  return (
    <>
      <section>
        <h1>{game?.title}</h1>
        <IframeComponent className="iframe" iframeString={game.iFrame} />
      </section>
    </>
  );
};
