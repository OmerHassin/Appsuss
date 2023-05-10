import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteTxt({note}) {
    return <section className="note-txt" >
        <p>{note.info.txt}</p>
    </section>
}