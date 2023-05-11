import { GamesSearch } from "./GamesSearch"
import { GamesList } from "./GamesList"
import { FiArrowRightCircle } from "react-icons/fi";

export const GamesContainer = ({searchParams, modalOpen, setModalOpen, returnedGames, setReturnedGames}) => {
    return  <>
        
        <GamesList />
        
        <GamesSearch searchParams={searchParams} modalOpen={modalOpen} returnedGames={returnedGames} setReturnedGames={setReturnedGames} setModalOpen={setModalOpen} />
        
    </>
}