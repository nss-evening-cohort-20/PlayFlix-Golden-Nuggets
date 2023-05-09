import { GamesSearch } from "./GamesSearch"
import { GamesList } from "./GamesList"

export const GamesContainer = ({searchParams, modalOpen, setModalOpen, returnedGames, setReturnedGames}) => {
    return  <>
        <GamesSearch searchParams={searchParams} modalOpen={modalOpen} returnedGames={returnedGames} setReturnedGames={setReturnedGames} setModalOpen={setModalOpen} />
        <GamesList  />
    </>
}