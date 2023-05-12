const { useState } = React
import { noteService } from '../services/note.service.js'

export function NoteAdd({ setNotes }) {
    const [newNoteContent, setNewNoteContent] = useState('')
    const [newNoteType, setNewNoteType] = useState('txt')
  
    function handleInputChange(event) {
      setNewNoteContent(event.target.value)
    }
  
    function handleNoteTypeChange(type) {
      setNewNoteType(type)
    }
  
    function handleNoteAdd(event) {
      event.preventDefault()
  
      const newNote = noteService.getEmptyNote()
      newNote.type = newNoteType
      switch (newNote.type) {
        case 'video':
          newNote.info.url = newNoteContent
          break
        case 'img':
          newNote.info.url = newNoteContent
          break
        case 'todos':
          const todos = newNoteContent.split(', ')
          newNote.info.todos = todos.map(todo => ({text: todo, done: false}))
          console.log(newNote.info.todos);
          break
        default:
          newNote.info.txt = newNoteContent
          break
      }
  
      noteService
        .save(newNote)
        .then((res) => {
          setNotes((prevNotes) => [...prevNotes, res])
        })
        .catch((err) => {
          console.log('Had issues posting note', err)
        })
  
      setNewNoteContent('')
    }
  
    return (
      <form className="note-add" onSubmit={handleNoteAdd}>
        <div className="note-add-input-container">
          <input
            type="text"
            placeholder={
                newNoteType === 'video'
                ? 'Add YouTube URL'
                : newNoteType === 'img'
                ? 'Enter an image URL'
                : newNoteType === 'todos'
                ? `Seperate todos by ','`
                : 'Enter a new note text'
            }
            value={newNoteContent}
            onChange={handleInputChange}
          />
          <div className="note-add-type-btns">
            <button
              type="button"
              className={`note-type-btn ${newNoteType === 'txt' ? 'active' : ''}`}
              onClick={() => handleNoteTypeChange('txt')}
            >
              <i className="fas fa-font"></i>
            </button>
            <button
              type="button"
              className={`note-type-btn ${newNoteType === 'video' ? 'active' : ''}`}
              onClick={() => handleNoteTypeChange('video')}
            >
              <i className="fas fa-video"></i>
            </button>
            <button
              type="button"
              className={`note-type-btn ${newNoteType === 'todos' ? 'active' : ''}`}
              onClick={() => handleNoteTypeChange('todos')}
            >
              <i className="fas fa-list-ul"></i>
            </button>
            <button
              type="button"
              className={`note-type-btn ${newNoteType === 'img' ? 'active' : ''}`}
              onClick={() => handleNoteTypeChange('img')}
            >
              <i className="fas fa-image"></i>
            </button>
          </div>
        </div>
        {/* <button type="submit">Add</button> */}
      </form>
    )
  }
