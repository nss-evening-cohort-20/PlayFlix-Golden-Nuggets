import { ModalComponent } from "../modal/SearchModal"

export const GamesSearch = ({ searchParams, modalOpen, setModalOpen }) => {
    
    return (
        <>
            <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen} searchParams={searchParams} />
        </>
    )
}