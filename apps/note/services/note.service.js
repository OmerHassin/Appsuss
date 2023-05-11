import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter
}

function query(filterBy = getDefaultFilter()) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regex.test(note.info.txt))
            }

            if (filterBy.type){
                notes = notes.filter(note => note.type === filterBy.type)
            }

            console.log(notes);
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
    // return axios.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    return storageService
      .query(NOTE_KEY)
      .then((notes) => {
        const existingMail = notes.find((item) => item.id === note.id);
        if (existingMail) {
          return storageService.put(NOTE_KEY, note);
        } else {
          return storageService.post(NOTE_KEY, note);
        }
      })
      .catch((error) => {
        console.error('Error while saving note:', error);
      });
  }

function getEmptyNote(type) {
    return {
        id: '',
        type,
        isPinned: false,
        info: {
            txt: 'insert text'
        },
        label: 'none',
    }
}

function getDefaultFilter() {
    return { txt: '', type: ''}
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length){
        const notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'txt',
                isPinned: true,
                backgroundColor: 'whitesmoke',
                info: {
                    txt: 'Omer'
                },
                label: 'none',
            },
            {
                id: 'n102',
                type: 'img',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me',
                    txt: 'Fullstack Me Baby2!'
                },
                backgroundColor: 'white',
                label: 'none',
            },
            {
                id: 'n103',
                type: 'todos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ],
                    txt: 'todo me'
                },
                backgroundColor: 'red',
                label: 'none',
            }   
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }
}