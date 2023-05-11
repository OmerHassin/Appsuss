import { LongTxt } from "../../../../cmps/long-txt.jsx";

export function NoteTxt({note}) {
    return <section className="note-txt" >
        <h2>{note.info.title}</h2>
        <LongTxt txt={note.info.txt} length={100} />
        <p>{note.type}</p>
    </section>
}