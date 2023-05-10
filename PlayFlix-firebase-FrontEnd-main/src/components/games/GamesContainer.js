import { useState } from "react"
import { GamesSearch } from "./GamesSearch"
import { GamesList } from "./GamesList"
import { FiArrowRightCircle } from "react-icons/fi";

export const GamesContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return  <>
        <GamesSearch  setterFunction={setSearchTerms} />
        <GamesList searchTermState={searchTerms} />
        
    </>
}