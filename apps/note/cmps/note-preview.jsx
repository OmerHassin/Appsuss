import { NoteTxt } from "./dynamic-inputs/note-txt.jsx"
import { NoteImg } from "./dynamic-inputs/note-img.jsx"
import { NoteTodos } from "./dynamic-inputs/note-todos.jsx"
import { NoteVideo } from "./dynamic-inputs/note-video.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React


export function NotePreview({note, onRemoveNote, onDuplicateNote}) {
  const [color, setColor] = useState(note.backgroundColor)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)

  const colorRef = useRef(color);

  function DynamicNoteType(props) {
    if (props.type === 'NoteTxt') {
      return <NoteTxt note={note}/>
    } else if (props.type === 'NoteImg') {
      return <NoteImg note={note} />
    } else if (props.type === 'NoteTodos') {
      return <NoteTodos note={note} />
    } else if (props.type === 'NoteVideo') {
      return <NoteVideo note={note} />
    }
  }

  function handleChangeNoteColor(color) {
    setColor(color)
    colorRef.current = color
    note.backgroundColor = color
    noteService.save(note)
    setIsColorPickerOpen(false)
  }

  function handleColorPickerToggle() {
    setIsColorPickerOpen(!isColorPickerOpen)
  }

  return (
    <article className="note-preview" style={{ backgroundColor: color }}>
      {DynamicNoteType(note)}
      <p>{note.id}</p>
      <section className="tooltip-menu">
        <button className="tooltip-btn" onClick={() => onDuplicateNote(note)}>
          <i className="fas fa-copy"></i>
        </button>
        <button className="tooltip-btn" onClick={handleColorPickerToggle}>
          <i className="fas fa-palette"></i>
        </button>
        <button className="tooltip-btn" onClick={() => onRemoveNote(note.id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
        {isColorPickerOpen && (
          <div className={`color-picker ${isColorPickerOpen ? 'open' : ''}`}>
            <button className="color-btn" style={{ backgroundColor: '#F44336' }} onClick={() => handleChangeNoteColor('#F44336')}></button>
            <button className="color-btn" style={{ backgroundColor: '#E91E63' }} onClick={() => handleChangeNoteColor('#E91E63')}></button>
            <button className="color-btn" style={{ backgroundColor: '#9C27B0' }} onClick={() => handleChangeNoteColor('#9C27B0')}></button>
            <button className="color-btn" style={{ backgroundColor: '#673AB7' }} onClick={() => handleChangeNoteColor('#673AB7')}></button>
            <button className="color-btn" style={{ backgroundColor: '#3F51B5' }} onClick={() => handleChangeNoteColor('#3F51B5')}></button>
            <button className="color-btn" style={{ backgroundColor: '#2196F3' }} onClick={() => handleChangeNoteColor('#2196F3')}></button>
          </div>
        )}
      </section>
    </article>
  )
}
