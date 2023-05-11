export function NoteImg({note}) {
    return <section className="note-img" >
        <p>{note.info.txt}</p>
        <p>{note.type}</p>
    </section>
}