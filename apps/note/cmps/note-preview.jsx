const { useState, useEffect, useRef } = React

import { NoteTxt } from "../cmps/note-txt.jsx";
import { noteService } from "../services/note.service.js"

export function NotePreview({note, onRemoveNote}){
    return(
        <article className="note-preview">
            <NoteTxt note={note}></NoteTxt>
            <button className="tooltip" onClick={() => onRemoveNote(note.id)}><span className="tooltip-text">Delete</span></button>
        </article>
    )
}