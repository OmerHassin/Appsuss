
const { useState, useEffect, useRef } = React

import { noteService } from "../services/note.service.js"

export function NoteFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
        console.log('filterByToEdit', filterByToEdit);
    }

    function onSearchClick() {
        console.log('search bar clicked');
    }

    return <section className="note-filter">
        <form className="nosubmit" onSubmit={onSubmitFilter}>
            <input type="text"
                id="txt"
                name="txt"
                placeholder="Search by text"
                value={filterByToEdit.txt}
                onChange={handleChange}
                onClick={onSearchClick}
            />

             <input type="text"
                id="type"
                name="type"
                placeholder="Search by type"
                value={filterByToEdit.type}
                onChange={handleChange}
                onClick={onSearchClick}
            />
        </form>
    </section>
}