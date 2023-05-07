import { GamesSearch } from "./GamesSearch"
import { GamesList } from "./GamesList"

export const GamesContainer = ({searchParams, modalOpen, setModalOpen}) => {
    return  <>
        <GamesSearch searchParams={searchParams} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <GamesList  />
    </>
}