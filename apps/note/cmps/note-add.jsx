const { useState } = React
import { noteService } from '../services/note.service.js'

export function NoteAdd({ setNotes }) {
    const [newNoteTitle, setNewNoteTitle] = useState('')
    const [newNoteType, setNewNoteType] = useState('txt')
  
    function handleInputChange(event) {
      setNewNoteTitle(event.target.value)
    }
  
    function handleNoteTypeChange(type) {
      setNewNoteType(type)
    }
  
    function handleNoteAdd(event) {
      event.preventDefault()
  
      const newNote = noteService.getEmptyNote()
      newNote.id = noteService
      newNote.info.title = newNoteTitle
      newNote.type = newNoteType
  
      noteService
        .save(newNote)
        .then((res) => {
          setNotes((prevNotes) => [...prevNotes, res])
        })
        .catch((err) => {
          console.log('Had issues posting note', err)
        })
  
      setNewNoteTitle('')
    }
  
    return (
      <form className="note-add" onSubmit={handleNoteAdd}>
        <div className="note-add-input-wrapper">
          <input
            type="text"
            placeholder="Enter a new note title"
            value={newNoteTitle}
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
        <button type="submit">Add</button>
      </form>
    )
  }
