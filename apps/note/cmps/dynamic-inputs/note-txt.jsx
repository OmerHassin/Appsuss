export function NoteTxt({note}) {
    return <section className="note-txt" >
        <p>{note.info.txt}</p>
        <p>{note.type}</p>
    </section>
}