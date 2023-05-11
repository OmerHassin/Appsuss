export function NoteVideo({note}) {
    return <section className="note-video" >
        <p>{note.info.txt}</p>
        <p>{note.type}</p>
    </section>
}