import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteTodos({note}) {
    return <section className="note-todos" >
        <p>{note.info.txt}</p>
        <p>{note.type}</p>
    </section>
}