const {useRef} = React

import { TodoList } from "./todos-list.jsx"

export function NoteTodos({note}) {
    const noteTitleRef = useRef(null)

    function changeContentTitle(ev) {
        note.info.title = noteTitleRef.current.innerText
        noteService.save(note)
    }

    return (    
        <section className="note-todos">
            <h2 ref={noteTitleRef} onKeyUp={(ev) => changeContentTitle(ev)} contentEditable={true} suppressContentEditableWarning={true}>{note.info.title}</h2>
            <TodoList todos={note.info.todos}></TodoList>
        </section>
    )
}