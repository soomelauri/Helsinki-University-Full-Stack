const Filter = ({ searchField, handleSearchFieldChange }) => {
    return (
        <div>
            <input value={searchField} onChange={handleSearchFieldChange} />
        </div>
    )
}

export default Filter
