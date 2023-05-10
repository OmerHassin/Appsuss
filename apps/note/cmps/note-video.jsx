import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteVideo({note}) {
    return <section className="note-video" >
        <p>{note.info.txt}</p>
        <p>{note.type}</p>
    </section>
}