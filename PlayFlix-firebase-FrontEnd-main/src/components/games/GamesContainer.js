import { useState } from "react"
import { GamesSearch } from "./GamesSearch"
import { GamesList } from "./GamesList"

export const GamesContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return  <>
        <GamesSearch  setterFunction={setSearchTerms} />
        <GamesList searchTermState={searchTerms} />
    </>
}