const { useState, useEffect, useRef } = React

import { NoteTxt } from "../cmps/note-txt.jsx"
import { NoteImg } from "./note-img.jsx"
import { NoteTodos } from "./note-todos.jsx"
import { NoteVideo } from "./note-video.jsx"
import { noteService } from "../services/note.service.js"
import { utilService } from "../../../services/util.service.js"


export function NotePreview({note, onRemoveNote}){
    const [color, setColor] = useState(noteService.get(note.id))
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)

    function handleDuplicateNote() {
        const duplicatedNote = {
          ...note,
          id: utilService.makeId(),
          createdAt: new Date(),
        }
        console.log(duplicatedNote);
        noteService.save(duplicatedNote)
    }

    function handleTooltipToggle() {
        setIsTooltipOpen(!isTooltipOpen)
    }

    function noteType() {
        if (note.type === 'NoteTxt') {
            return <NoteTxt note={note}/>

        } else if (note.type === 'NoteImg') {
            return <NoteImg note={note} />

        } else if (note.type === 'NoteTodos') {
            return <NoteTodos note={note} />

        } else if (note.type === 'NoteVideo') {
            return <NoteVideo note={note} />
        }
    }

    return (
    <article className="note-preview">
        {noteType(note)}
        <p className="content">{note.content}</p>
        <div className="tooltip">
            <button className="menu-icon" onClick={handleTooltipToggle}>
            <i className="fas fa-ellipsis-h"></i>
            </button>
            {isTooltipOpen && (
            <div className="tooltip-menu">
                <button onClick={handleDuplicateNote}>Duplicate</button>
                {/* <button onClick={handleChangeColor}>Change color</button> */}
                {/* <button onClick={handleSendEmail}>Send via email</button> */}
            </div>
            )}
        </div>
        <button className="delete-note" onClick={() => onRemoveNote(note.id)}>
            <i className="fas fa-trash-alt"></i>
        </button>
    </article>
    )
}