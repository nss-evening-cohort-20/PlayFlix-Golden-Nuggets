export const GamesSearch = ({ setterFunction }) => {
    return (
        <div>
            <label for="gameInput"> Input game here</label>
            <input
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    }
                }
                type="text" id="gameInput" placeholder="Enter search terms" />
        </div>
    )
}