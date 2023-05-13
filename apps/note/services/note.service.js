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
                const regex = new RegExp(filterBy.type, 'i')
                notes = notes.filter(note => regex.test(note.type))
            }

            const pinnedNotes = notes.filter(note => note.isPinned)
            const unpinnedNotes = notes.filter(note => !note.isPinned)
            const sortedNotes = pinnedNotes.concat(unpinnedNotes)

            console.log(sortedNotes);
            return sortedNotes
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
        const existingNote = notes.find((item) => item.id === note.id);
        if (existingNote) {
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
        id: utilService.makeId(),
        type,
        isPinned: false,
        backgroundColor: 'whitesmoke',
        info: {
            title: 'insert title',
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
                backgroundColor: '#FFF475',
                info: {
                    title: 'Sample Text',
                    txt: 'This is a sample text note. You can write your notes here and keep them organized. Feel free to customize the background color, pin the note, and add labels to stay organized. Happy note-taking!'
                },
                label: 'none',
            },
            {
                id: 'n102',
                type: 'img',
                isPinned: false,
                info: {
                    url: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcT3tuC6EWkh91DJKKHa6g06r7HX4JcbckHKyLYr-FWe0_HMhM_y-pBiAlFiLV6duuF1ms9KkYvhSoDHOj0",
                    title: 'Bobby and Me',
                    txt: 'Fullstack Me Baby2!'
                },
                backgroundColor: '#FBBC05',
                label: 'none',
            },
            {
                id: 'n103',
                type: 'todos',
                isPinned: false,
                info: {
                    title: 'To buy',
                    todos: [
                        { text: 'Milk', done: false },
                        { text: 'Butter', done: true },
                        { text: 'Potatoes', done: false },
                    ],
                    txt: 'For Mashed potatoes'
                },
                backgroundColor: '#CCFF90',
                label: 'none',
            },
            {
                id: 'n104',
                type: 'video',
                isPinned: false,
                info: {
                    url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q&ab_channel=Fireship',
                    title: 'Every REACT hook',
                    txt: 'Fireship tutorial about all hooks needed'
                },
                backgroundColor: '#F28B82',
                label: 'none',
            },
            {
                id: 'n105',
                type: 'video',
                isPinned: false,
                info: {
                    url: 'https://www.youtube.com/watch?v=iEs3qXQvg6M&ab_channel=J.KenjiL%C3%B3pez-Alt',
                    title: 'Beef and Brocoli',
                    txt: 'Great recipe kfir sent me'
                },
                backgroundColor: '#F28B82',
                label: 'none',
            },
            {
                id: 'n106',
                type: 'img',
                isPinned: false,
                info: {
                    url: "https://picsum.photos/200",
                    title: 'Random Picsum photo',
                    txt: 'Forever changing photo from Picsum'
                },
                backgroundColor: '#FBBC05',
                label: 'none',
            },
            {
                id: 'n107',
                type: 'video',
                isPinned: false,
                info: {
                    url: 'https://www.youtube.com/watch?v=ZVXUcm_AuRk&ab_channel=FPLMate',
                    title: 'Fantasy Premier League!',
                    txt: 'Winning tips for the premier league season!'
                },
                backgroundColor: '#F28B82',
                label: 'none',
            },
            {
                id: 'n108',
                createdAt: 1112222,
                type: 'txt',
                isPinned: true,
                backgroundColor: '#FFF475',
                info: {
                    title: 'FIFA 23 Patch #12',
                    txt: 'FIFA 23 patch #12 is available today for Xbox Series X|S, PlayStation 5 and PC addressing some issues in FIFA Ultimate Team, Pro Clubs, VOLTA Football and more. Check out the patch notes below.'
                },
                label: 'none',
            },
            {
                id: 'n109',
                type: 'todos',
                isPinned: false,
                info: {
                    title: 'Get my shit together',
                    todos: [
                        { text: 'Brush teeth', done: false },
                        { text: 'Eat healty', done: true },
                        { text: 'Sleep well', done: false },
                    ],
                    txt: ''
                },
                backgroundColor: '#CCFF90',
                label: 'none',
            },
            {
                id: 'n110',
                type: 'img',
                isPinned: false,
                info: {
                    url: "https://www.operationsports.com/wp-content/uploads/2023/05/fifa-23.png?w=1024",
                    title: 'city vs madrid',
                    txt: 'draw 1-1'
                },
                backgroundColor: '#FBBC05',
                label: 'none',
            }
        ]

        utilService.saveToStorage(NOTE_KEY, notes)
    }
}