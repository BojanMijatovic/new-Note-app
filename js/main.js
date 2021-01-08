//  notes arr
const notesList = [{
        text: 'Learn JS',
        status: false
    }, {
        text: 'Work on project',
        status: true
    }, {
        text: 'Find new job',
        status: false
    }, {
        text: 'Learn more ',
        status: false
    },
    {
        text: 'Start freelance carrier',
        status: true
    }
];

// selection
const app = document.querySelector('.app');
const notes = document.querySelector('.notes');
const count = document.querySelector('.count');
const inputNote = document.querySelector('.input-note');
const numberNotes = document.querySelector('.number-notes');
const removeAllBtn = document.querySelector('.remove-all');
const addNoteBtn = document.querySelector('.add-note');
const newNoteValue = document.querySelector('#new-note');
const clearCompleteNotesBtn = document.querySelector('.clear-completed-notes');


// show notes List
const showList = () => {
    notes.innerHTML = '';
    if (newNoteValue.value == '') {
        notes.innerHTML = '<div class="note "><p class="error">Insert real value</p></div>'
    } else {
        notesList.push({ text: newNoteValue.value, status: false })
        notesList.forEach(noteItem => {
            const newNote = document.createElement('div');
            newNote.innerHTML = `
                <span><input type="checkbox" name="" id="complete-note" /></span>
                <p class="text-note">${noteItem.text}</p>
                <span class="remove-note">X</span>`;
            newNote.classList.add('note');
            notes.append(newNote);
        });
    }
}


//  uncompleted Notes length
const showLengthNotes = (notes) => {
        const uncompletedNotes = notes.filter(note => !note.status);
        numberNotes.textContent = `${uncompletedNotes.length ? uncompletedNotes.length : `0`} notes left`;
  count.append(numberNotes);
}


// remove all notes
removeAllBtn.addEventListener('click', () => {
  // notes.innerHTML = '';
  inputNote.classList.add('move-item');
  notes.style.display = 'none';
})


//  add new note
addNoteBtn.addEventListener('click', () => {
  notes.style.display = 'flex';
  inputNote.classList.remove('move-item');
  showList();
  console.log(notesList);
  newNoteValue.value = '';
})