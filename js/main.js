const notesList = document.querySelector('.notes');
const app = document.querySelector('.app');
const searchNote = document.querySelector('#search-note');


//  form
const form = document.querySelector('#new-form');

// hide-completed-notes
const hideCompleteNotes = document.querySelector('#hide-completed-notes');



//  notes arr
const notes = [{
        text: 'Learn JS',
        completed: false
    }, {
        text: 'Work on project',
        completed: true
    }, {
        text: 'Find new job',
        completed: false
    }, {
        text: 'Learn more ',
        completed: false
    },
    {
        text: 'Start freelance carrier',
        completed: true
    }
];

//  filtered object
const filters = {
    searchText: '',
    hideCompleted: false
}

//  render notes
const renderNotes = (notes, filters) => {

    const filteredNotes = notes.filter(note => {
        const searchTexMatch = note.text.toLowerCase().includes(filters.searchText.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !note.completed;
        return searchTexMatch && hideCompletedMatch;
    })

    // filteredNotes =
    // {
    // if (filters.hideCompleted) {
    //     return !note.completed;
    // } else {
    //     return true;
    // }
    // })

    notesList.innerHTML = '';

    //  show list notes
    filteredNotes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.textContent = note.text;
        notesList.append(noteItem);
    });

    //  filter notes
    const notCompletedNotes = filteredNotes.filter(note => !note.completed);
    //  note complete notes length
    const test = `You have more ${notCompletedNotes.length} to complete`;
    // check for classes
    notesList.append(test);
}


renderNotes(notes, filters)


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
        notes.push({ text: e.target.elements.fromForm.value, completed: false });
        e.target.elements.fromForm.value = '';
        renderNotes(notes, filters);
    }
})


// hide-completed-notes
hideCompleteNotes.addEventListener('change', (e) => {
    console.log(e.target.checked);
    filters.hideCompleted = e.target.checked;
    renderNotes(notes, filters);
    console.log(filters);
})