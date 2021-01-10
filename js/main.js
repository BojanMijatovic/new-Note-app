const notesList = document.querySelector('.notes');
const app = document.querySelector('.app');
const searchNote = document.querySelector('#search-note');
const form = document.querySelector('#new-form');
const hideCompleteNotes = document.querySelector('#hide-completed-notes');


//  notes arr
let notes = [];

//  filtered object
const filters = {
    searchText: '',
    hideCompleted: false
}

const notesJSON = localStorage.getItem('notes');
if (notesJSON !== null) {
    notes = JSON.parse(notesJSON);
}


//  remove note
const removeSingleItem = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}



//  render notes
const renderNotes = (notes, filters) => {

    const filteredNotes = notes.filter(note => {
        const searchTexMatch = note.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !note.completed;
        return searchTexMatch && hideCompletedMatch;
    })

    notesList.innerHTML = '';

    //  show list notes
    filteredNotes.forEach(note => {
        //  create single element
        const noteItem = document.createElement('div');
        const checkBtn = document.createElement('input');
        checkBtn.setAttribute('type', 'checkbox');
        const noteText = document.createElement('span');
        const removeBtn = document.createElement('button');

        removeBtn.textContent = 'x';
        noteText.textContent = note.text;

        //  remove single item
        removeBtn.addEventListener('click', function() {
            removeSingleItem(note.id);
            localStorage.setItem('notes', JSON.stringify(notes));
            renderNotes(notes, filters);
        });

        //  append single item
        noteItem.append(checkBtn);
        noteItem.append(noteText);
        noteItem.append(removeBtn);

        //  append item to list 
        notesList.append(noteItem);
    });

    //  filter notes
    const notCompletedNotes = filteredNotes.filter(note => !note.completed);
    //  note complete notes length
    const test = `You have more ${notCompletedNotes.length} to complete`;
    // check for classes
    notesList.append(test);
}

renderNotes(notes, filters);


// search notes
searchNote.addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    const n = document.createElement('p');
    n.textContent = e.target.value;
    //  check for classes 
    notesList.append(n);
    renderNotes(notes, filters)
})


//  form 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (e.target.elements.fromForm.value == '') {
        //  check values
        console.log(`Insert real value`);
    } else {
        notes.push({ text: e.target.elements.fromForm.value, completed: false, id: uuidv4() });
        localStorage.setItem('notes', JSON.stringify(notes));
        e.target.elements.fromForm.value = '';
        renderNotes(notes, filters);
    }
})

// hide-completed-notes
hideCompleteNotes.addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderNotes(notes, filters);
})


console.log(notes);