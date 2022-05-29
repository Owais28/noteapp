localStorage.setItem('noteapp-notes',"[]");

const settingOptionButton = document.querySelector('.setting__option');
const settingMenu = document.querySelector('.setting__menu');
const noteArea = document.querySelector('.note__right')
const addNewNoteButton = document.querySelector('.note__button-addNew')
const noteLeftNotes = document.querySelector('.note__left-notes'); 

const noteBox = `<input type='text' name='noteTitle' id='' class='note__right-title' placeholder="Title...">
<textarea wrap="soft"  name='noteBody' id='' cols='30' rows='10' class='note__right-body' placeholder="this is my new note!"></textarea>
<button type="button" class='button__right-save' >Save</button>
<button type="button" class='button__right-delete delete'>Delete</button>
<div class='setting__option'><i class="fa-solid fa-sliders"></i></div>
<div class='setting__menu'><div class='setting__menu-item'><i class="fa-solid fa-font"></i><div class='font-choice'>Font1</div></div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
<div class='setting__menu-item'>
<div class='font-choice'>Font1</div>
</div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
</div>`

// console.log(noteLeft);
// setting option button


// create new Node
addNewNoteButton.addEventListener('click', () => {
    noteArea.innerHTML = noteBox;

    const saveButton = document.querySelector('.button__right-save')
    saveButton.addEventListener('click', () => {
        saveNewNote()
    })
    
})


// this function takes all notes from localStorage and add it to 
// Left part of note app that is "noteLeft"
// this function is called every time whenever user save his note to local storage
const makeNotesList = (notes=[{title:"Dummy Title",body:'loremsf sf fjdasloiea eadkalada daljda'}]) => {

    const noteList = [];

    notes.map(
        (note) => {
            const newNoteItem = `<div class='note__new'><div class='note__new-title'>${note.title}</div><div class='note__new-body'>${note.body}</div></div>`
            noteList.push(newNoteItem);
        }
    )

    console.log(noteList);
    noteLeftNotes.innerHTML = noteList.join('');
}


function saveNewNote(){
    
    // empty note object for new note
    const newNote = {};
    
    // getting current data of new note through DOM
    const _id = Math.floor(Math.random() * 1000000);

    // reference to note title object i.e <input>
    const title = document.querySelector('.note__right-title');
    const titleText = title.value;

    // if title content is empty
    // make sure user to give a title
    if(titleText === ""){

        const modal = `<div class='modal'>
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>A note must have a <strong>title</strong>! Plz give title to your note</p>
        </div>`

        addModal(modal);
        clearModal();
        return;
    }

    // reference to note body object i.e <textarea>
    const body = document.querySelector('.note__right-body');
    const bodyText = body.value;

    // check whether body of note is empty or not
    // if body content is empty
    // make sure user to type body text
    if(bodyText === ""){
        const modal = `<div class='modal'>
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>A note must have <strong>body</strong>! Plz give body to your note</p>
        </div>`
        addModal(modal);
        clearModal();
        return;
    }

    // console.log(localStorage.getItem('noteapp-notes'));

    // making new note
    newNote.title = titleText;
    newNote.body = bodyText;
    newNote.id = _id;

    // getting previous local storage data
    const noteStorage = localStorage.getItem('noteapp-notes');
    const noteStorageAfterParse = JSON.parse(noteStorage)

    // updating local storage with newly added note
    noteStorageAfterParse.push(newNote);
    localStorage.setItem('noteapp-notes',JSON.stringify(noteStorageAfterParse))

    // testing...
    // console.log(noteStorageAfterParse)
    // getting localStorage with recently added note
    const newNoteStorage = localStorage.getItem('noteapp-notes');
    const newNoteStorageAfterParse = JSON.parse(newNoteStorage);

    makeNotesList(newNoteStorageAfterParse);

    // console.log(noteLeft);  

}

// remove modal from the DOM 
const clearModal = () => {
    const modal = document.querySelector('.modal');
    
    setTimeout(()=>{
        modal.remove()
    }, 3000)
}

// this function add modal to screen if there is any field empty!
const addModal = (modal) => {
    const modalWrapper = document.querySelector('.modal-before')
    // console.log(modalWrapper)
    modalWrapper.innerHTML = modal;
}





