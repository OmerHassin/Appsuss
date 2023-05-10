import { NotePreview } from "./note-preview.jsx";

export function NoteList() {
    return(
        <ul>
            <li><NotePreview></NotePreview></li>
            <li><NotePreview></NotePreview></li>
            <li><NotePreview></NotePreview></li>
            <li><NotePreview></NotePreview></li>
        </ul>
    )
}
