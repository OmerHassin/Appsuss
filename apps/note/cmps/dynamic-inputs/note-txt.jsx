import { LongTxt } from "../../../../cmps/long-txt.jsx"
import { noteService } from "../../services/note.service.js"

const {useRef} = React

export function NoteTxt({note}) {
    // const noteTxtRef = useRef(null)
    const noteTitleRef = useRef(null)

    // function changeContent(ev) {
    //     note.info.txt = noteTxtRef.current.innerText
    //     noteService.save(note)
    // }

    function changeContentTitle(ev) {
        note.info.title = noteTitleRef.current.innerText
        noteService.save(note)
    }

    return <section className="note-txt css-fix" >
        <h3 ref={noteTitleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h3>
        <LongTxt txt={note.info.txt} length={100} />
        {/* <p ref={noteTxtRef} onKeyUp={(ev) => changeContent(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.txt}</p> */}
    </section>
    // return <section className="note-txt" >
    //     <h2 contentEditable={true}>{note.info.title}</h2>
    //     <LongTxt txt={note.info.txt} length={100} />
    //     <p>{note.type}</p>
    // </section>
}