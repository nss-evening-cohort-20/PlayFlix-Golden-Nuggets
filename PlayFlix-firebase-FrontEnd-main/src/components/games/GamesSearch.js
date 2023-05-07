import { ModalComponent } from "../modal/Modal"

export const GamesSearch = ({ searchParams, modalOpen, setModalOpen }) => {
    
    return (
        <>
            <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen} searchParams={searchParams} />
        </>
    )
}