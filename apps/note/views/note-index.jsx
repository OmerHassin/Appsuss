import { noteService } from "../services/note.service.js";
import { NoteList } from "../cmps/note-list.jsx";

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        console.log('use effect');
        loadNotes()
    }, [])

    function loadNotes() {
        console.log('loadNotes');
        noteService.query().then(notes =>
            setNotes(notes)
        )
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
            <NoteList notes={notes} onRemoveNote={onRemoveNote}></NoteList>

            {!notes.length && <div>Your note list is empty</div>}
        </section>
    )
}
