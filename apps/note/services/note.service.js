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
                    url: "https://www.google.com/search?q=fpl+fantasy&tbm=isch&sxsrf=APwXEdf5LpB8xBtX9UNNUa1IRUg2HHFR4w:1683812817667&source=lnms&sa=X&ved=2ahUKEwjT1PXGs-3-AhULqaQKHfyND0sQ_AUoAnoECAEQBA&biw=1124&bih=919&dpr=1#imgrc=N4YuYRg0ewt72M",
                    title: 'Bobi and Me',
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
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ],
                    txt: 'todo me'
                },
                backgroundColor: '#CCFF90',
                label: 'none',
            },
            {
                id: 'n104',
                type: 'video',
                isPinned: false,
                info: {
                    url: 'https://www.youtube.com/watch?v=NxXXSgwdLmU&ab_channel=BrianLagerstrom',
                    title: 'Beef and Brocoli',
                    txt: 'Great recipe kfir sent me'
                },
                backgroundColor: '#F28B82',
                label: 'none',
            },
            {
                id: 'n105',
                type: 'video',
                isPinned: false,
                info: {
                    url: 'https://www.youtube.com/watch?v=NxXXSgwdLmU&ab_channel=BrianLagerstrom',
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
                    url: "https://www.google.com/search?q=fpl+fantasy&tbm=isch&sxsrf=APwXEdf5LpB8xBtX9UNNUa1IRUg2HHFR4w:1683812817667&source=lnms&sa=X&ved=2ahUKEwjT1PXGs-3-AhULqaQKHfyND0sQ_AUoAnoECAEQBA&biw=1124&bih=919&dpr=1#imgrc=N4YuYRg0ewt72M",
                    title: 'Bobi and Me',
                    txt: 'My pet'
                },
                backgroundColor: '#FBBC05',
                label: 'none',
            },
            {
                id: 'n107',
                type: 'video',
                isPinned: false,
                info: {
                    url: 'https://www.youtube.com/watch?v=NxXXSgwdLmU&ab_channel=BrianLagerstrom',
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
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ],
                    txt: 'todo me'
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