import { LongTxt } from "../../../../cmps/long-txt.jsx"
import { noteService } from "../../services/note.service.js"

const {useRef} = React

export function NoteImg({note}) {
    const noteTitleRef = useRef(null)

    function changeContentTitle(ev) {
        note.info.title = noteTitleRef.current.innerText
        noteService.save(note)
    }

    return <section className="note-img" >
        <h3 ref={noteTitleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h3>
        <LongTxt txt={note.info.txt} length={100} />
        <img src={'https://www.google.com/search?q=fpl+fantasy&sxsrf=APwXEdcFQjMEiHhkg4jensPrfwDFDIt5Ew:1683827582237&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiBw5vH6u3-AhWCdKQEHQXpBLgQ_AUoAnoECAEQBA&biw=1003&bih=919&dpr=1#imgrc=N4YuYRg0ewt72M'} alt={note.info.title} />
        {/* <img src={note.info.url} alt={note.info.title} /> */}
        <p>{note.type}</p>
    </section>
}