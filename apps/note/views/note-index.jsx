import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from "../cmps/note-filter.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        console.log('use effect');
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        console.log('loadNotes');
        noteService.query(filterBy).then(notes =>
            setNotes(notes)
        )
    }

    function onSetFilter(filterByFromFilter) {
        setFilterBy(filterByFromFilter)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setNotes(updatedNotes)
        })
            .catch((err) => {
                console.log('Had issues removing', err)
            })
    }

    if (!notes) return <h1>Your note list is empty</h1>
    return (
        <section className="note-index">
            <NoteFilter onSetFilter={onSetFilter} />

            <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>

            {!notes.length && <div>Your note list is empty</div>}
        </section>
    )
}
