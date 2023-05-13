import { ModalComponent } from "../modal/SearchModal"



export const GamesSearch = ({ modalOpen, setModalOpen, returnedGames, searchParams, setReturnedGames }) => {
    

    return (
        <>



            <ModalComponent
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                setReturnedGames={setReturnedGames}
                returnedGames={returnedGames}
                searchParams={searchParams}
            />



        </>
    )
}