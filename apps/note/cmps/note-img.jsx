import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteImg({note}) {
    return <section className="note-img" >
        <p>{note.info.txt}</p>
        <p>{note.type}</p>
    </section>
}