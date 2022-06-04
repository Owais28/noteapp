

// !TODO : 1. add update feature ,

if(!localStorage.getItem('noteapp-notes'))
{
  localStorage.setItem('noteapp-notes','[]')
}

// localStorage.setItem('noteapp-notes',"[]");

const settingOptionButton = document.querySelector(".setting__option");
const settingMenu = document.querySelector(".setting__menu");
const noteArea = document.querySelector(".note__right");
const addNewNoteButton = document.querySelector(".note__button-addNew");
const noteLeftNotes = document.querySelector(".note__left-notes");

const noteBox = `<input type='text' name='noteTitle' id='' class='note__right-title' placeholder="Title...">
<textarea wrap="soft"  name='noteBody' id='' cols='30' rows='10' class='note__right-body' placeholder="this is my new note!"></textarea>
<button type="button" class='button__right-save' >Save</button>
<button type="button" class='button__right-delete delete'>Delete</button>
<div class='setting__option'><i class="fa-solid fa-sliders"></i></div>
<div class='setting__menu'><div class='setting__menu-item'><i class="fa-solid fa-font"></i><div class='font-choice'>Font1</div></div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
<div class='setting__menu-item'>
<div class='font-choice'>Font1</div>
</div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
</div>`;

const modalButton = document.querySelector(".modal-button");
// const mobileOptionsButton = document.querySelector('.note__mobile-options')
// const noteModal = document.querySelector('.note__mobile-modal')

// console.log(noteLeft);
// setting option button

// Emojis




// create new Node
addNewNoteButton.addEventListener("click", () => {

  noteArea.innerHTML = noteBox;

  document.querySelector('.note__right-title').focus();

  const saveButton = document.querySelector(".button__right-save");
  saveButton.addEventListener("click", () => {
    saveNewNote();


  });

  const deleteButton = document.querySelector('.button__right-delete');
  deleteButton.addEventListener('click', () => {
    noteArea.innerHTML = '';
  })

});




// this function takes all notes from localStorage and add it to
// Left part of note app that is "noteLeft"
// this function is called every time whenever user save his note to local storage
const makeNotesList = (
  notes = [
    { title: "Dummy Title", body: "loremsf sf fjdasloiea eadkalada daljda" },
  ]
) => {
  const noteList = [];

  notes.map((note) => {
    const newNoteItem = `<div class='note__new'><div class='note__new-title'>${note.title}</div><div class='note__new-body'>${note.body}</div><div class="note__footer"><div class='note__date'>
            ${
              note.lastUpdate !== "" ? `last updated &rarr;<br/>` + note.lastUpdate : note.dateCreated
            }
        </div><div class='note__more-options'>
            <i class="fa-solid fa-file-pen"></i>
            <i class="fa-solid fa-trash-can"></i>
        </div>
        </div>
        </div>`;

    noteList.push(newNoteItem);
  });

  // console.log(noteList);
  noteLeftNotes.innerHTML = noteList.join("");

  
  deleteNoteFunctionality();
  updateNoteFunctionality();
  showNoteFunctionality();
};


const showNoteFunctionality = () => {
  const addEventListenerToEveryNote = () => {

    const notes = document.querySelectorAll('.note__new-title');

    notes.forEach(
      (note) => {
        note.addEventListener('click', function showNote(event) {

          const NOTE = event.target.parentNode
          noteArea.innerHTML = `<div type='text' id="note-box" class='note__show-title'>${NOTE.children[0].textContent}</div>
          <div class='note__show-body' >${NOTE.children[1].textContent}</div>`
        //   let titleContent, bodyContent;
        // function fillInWrapper(title, body){
          // let noteBox = `<div type='text'  class='note__right-title' >${title}</div>
          // <div class='note__right-body' >${body}</div>`
        //   noteArea.innerHTML = noteBox
        // }
        //   console.log(note.children[0].textContent);
        //   titleContent = note.children[0].textContent;
        //   bodyContent = note.children[0].textContent;

        //   noteArea.innerHTML = fillInWrapper(titleContent, bodyContent);
        //   fillInWrapper(titleContent,bodyContent)
        // noteArea.innerHTML = titleContent

        // console.log(NOTE.children[0].textContent)

        // window.scrollTo(0,findPos())
        // console.log(scrofindPos(document.getElementById('note-box')));
        // document.querySelector('#note-box').scrollIntoView({
        //   behavior: 'smooth'
        // })
        })
      }
    )
  }

  addEventListenerToEveryNote();
}

const deleteNoteFunctionality = () => {

  // adding event listeners to
  const addEventListenerToDeleteButtons = () => {
    const deleteButtons = document.querySelectorAll(".fa-trash-can");

    deleteButtons.forEach((deleteButton) => {
      deleteButton.addEventListener(
        "click",
        function deleteNoteFunction(event) {
          if (confirm("Are you sure to delete this note?") === true) {
            let target = event.target;
            const superParent = target.parentNode.parentNode.parentNode;

            // testing...
            // console.log(superParent.children[0].textContent)

            const targetTitle = superParent.children[0].textContent;
            const targetBody = superParent.children[1].textContent;

            const localStorageTemporary = JSON.parse(
              localStorage.getItem("noteapp-notes")
            );
            // console.log(localStorageTemporary)

            const newArrayOfNotesAfterFilter = localStorageTemporary.filter(
              (note) => {
                if (note.title !== targetTitle && note.body !== targetBody) {
                  return true;
                }
              }
            );

            localStorage.setItem(
              "noteapp-notes",
              JSON.stringify(newArrayOfNotesAfterFilter)
            );

            // console.log(newArrayOfNotesAfterFilter);
            makeNotesList(newArrayOfNotesAfterFilter);
            noteArea.innerHTML = ""
          } else {
            return;
          }
        }
      );
    });

    // deleteButtons
    // console.log(deleteButtons)
  };

  addEventListenerToDeleteButtons();
};


function updateNoteFunctionality() {
  noteArea.innerHTML = ""
  // console.log(noteArea);

  // adding event listeners to update button
  const addEventListenerToUpdateButtons = () => {
    const updateButtons = document.querySelectorAll(".fa-file-pen");

    // noteArea.innerHTML = `<input type='text' name='noteTitle' id=''  placeholder="Title...">
    //         <textarea wrap="soft"  name='noteBody' id='' cols='30' rows='10'  placeholder="this is my new note!"></textarea>
    //         <button type="button" class='button__right-update' >Update</button>
    //         <button type="button" class='button__right-unchanged'>Remain unchanged</button>
    //         <div class='setting__option'><i class="fa-solid fa-sliders"></i></div>
    //         <div class='setting__menu'><div class='setting__menu-item'><i class="fa-solid fa-font"></i><div class='font-choice'>Font1</div></div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
    //         <div class='setting__menu-item'>
    //         <div class='font-choice'>Font1</div>
    //         </div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
    //         </div>`

    updateButtons.forEach((updateButton) => {

      updateButton.addEventListener(
        "click",
        function updateNoteFunction(event) {
          if (confirm("Are you sure to update this note?") === true) {
            noteArea.innerHTML = "fsed";
            let target = event.target;
            const superParent = target.parentNode.parentNode.parentNode;
            // testing...
            // console.log(superParent.children[0].textContent)

            let targetTitle = superParent.children[0].textContent;
            let targetBody = superParent.children[1].textContent;
            let targetId;
            let dateCreated;

            // getting local Storage data before applying current updates
            const localStorageTemporary = JSON.parse(
              localStorage.getItem("noteapp-notes")
            );
            // console.log(localStorageTemporary)

            // making new array of notes from old notes data excluding our note to be changed
            const newArrayOfNotesAfterFilter = localStorageTemporary.filter(
              (note) => {
                if (note.title !== targetTitle && note.body !== targetBody) {
                  return true;
                } else {
                  targetId = note.id;
                  dateCreated = note.dateCreated;
                  console.log(dateCreated);
                  return false;
                }
              }
            );


            noteArea.innerHTML = `<input type='text' name='noteTitle' id='' class="note__title"  placeholder="Title...">
            <textarea wrap="soft" class="note__body"  name='noteBody' id='' cols='30' rows='10'  placeholder="this is my new note!"></textarea>
            <button type="button" class='button__right-update' >Update</button>
            <button type="button" class='button__right-unchanged'>Remain unchanged</button>
            <div class='setting__option'><i class="fa-solid fa-sliders"></i></div>
            <div class='setting__menu'><div class='setting__menu-item'><i class="fa-solid fa-font"></i><div class='font-choice'>Font1</div></div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
            <div class='setting__menu-item'>
            <div class='font-choice'>Font1</div>
            </div><div class='setting__menu-item'><div class='font-choice'>Font1</div></div>
            </div>`

            

            const oldTitleField = document.querySelector('.note__title');
            oldTitleField.value = targetTitle;

            const oldBodyField = document.querySelector('.note__body');
            oldBodyField.value = targetBody;

            oldBodyField.focus()

            function addEventListenersToNewButtons() {
              const updateButton = document.querySelector('.button__right-update')
              const unchangedButton = document.querySelector('.button__right-unchanged')
              

              updateButton.addEventListener('click', () => {
                // console.log(oldTitleField.value + " " + oldTitleField) testing
                targetTitle = oldTitleField.value;
                targetBody = oldBodyField.value;

                newArrayOfNotesAfterFilter.push(
                  {
                    id : targetId,
                    title : targetTitle,
                    body : targetBody,
                    dateCreated : dateCreated,
                    lastUpdate : new Date().toLocaleString()
                  }
                )
                // console.log(newArrayOfNotesAfterFilter)

                localStorage.setItem('noteapp-notes', JSON.stringify(newArrayOfNotesAfterFilter));

                makeNotesList(JSON.parse(localStorage.getItem('noteapp-notes')));

                noteArea.innerHTML = ""

              })

              unchangedButton.addEventListener('click', () => {
                noteArea.innerHTML = "";
              })
            }

            addEventListenersToNewButtons()
            // localStorage.setItem(
            //   "noteapp-notes",
            //   JSON.stringify(newArrayOfNotesAfterFilter)
            // );

            // console.log(newArrayOfNotesAfterFilter);
          } else {
            return;
          }
        }
      );
    });

    // deleteButtons
    // console.log(deleteButtons)
  };

  addEventListenerToUpdateButtons();
  // console.log(noteArea.innerHTML)

}

makeNotesList(JSON.parse(localStorage.getItem("noteapp-notes")));

const alertSound = new Audio("sci-fi-beeperror-179-sound-effect-97326661.mp3");

function saveNewNote() {
  // empty note object for new note
  const newNote = {};

  // getting current data of new note through DOM
  const _id = Math.floor(Math.random() * 1000000);

  // reference to note title object i.e <input>
  const title = document.querySelector(".note__right-title");
  const titleText = title.value;

  // if title content is empty
  // make sure user to give a title
  if (titleText === "") {
    const modal = `<div class='modal'>
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>A note must have a <strong>title</strong>! Plz give title to your note</p>
        </div>`;

    alertSound.play();
    addModal(modal);
    clearModal();
    return;
  }

  // reference to note body object i.e <textarea>
  const body = document.querySelector(".note__right-body");
  const bodyText = body.value;

  // check whether body of note is empty or not
  // if body content is empty
  // make sure user to type body text
  if (bodyText === "") {
    const modal = `<div class='modal'>
        <i class="fa-solid fa-circle-exclamation"></i>
        <p>A note must have <strong>body</strong>! Plz give body to your note</p>
        </div>`;

    alertSound.play();
    addModal(modal);
    clearModal();
    return;
  }

  const date = new Date();
  // console.log(date)
  // const time = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // console.log(localStorage.getItem('noteapp-notes'));

  // making new note
  newNote.title = titleText;
  newNote.body = bodyText;
  newNote.id = _id;
  newNote.dateCreated = date.toLocaleString();
  newNote.lastUpdate = "";

  // getting previous local storage data
  const noteStorage = localStorage.getItem("noteapp-notes");
  const noteStorageAfterParse = JSON.parse(noteStorage);

  // updating local storage with newly added note
  noteStorageAfterParse.push(newNote);
  localStorage.setItem("noteapp-notes", JSON.stringify(noteStorageAfterParse));

  // testing...
  // console.log(noteStorageAfterParse)
  // getting localStorage with recently added note
  const newNoteStorage = localStorage.getItem("noteapp-notes");
  const newNoteStorageAfterParse = JSON.parse(newNoteStorage);

  makeNotesList(newNoteStorageAfterParse);
  noteArea.innerHTML = "";

  const successAudio = new Audio('mixkit-fantasy-game-success-notification-270.wav')
  const modal = `<div class='modal success'>
  <i class="fa-solid fa-circle-check"></i>
        <p>Hurray! 🥳 Your note has been saved successfully.</p>
        </div>`;

    // alertSound.play();
    addModal(modal);
    successAudio.play();
    clearModal();

  // console.log(noteLeft);
}



// remove modal from the DOM
const clearModal = () => {
  const modal = document.querySelector(".modal");

  setTimeout(() => {
    modal.remove();
  }, 3000);
};

// this function add modal to screen if there is any field empty!
const addModal = (modal) => {
  const modalWrapper = document.querySelector(".modal-before");
  // console.log(modalWrapper)
  modalWrapper.innerHTML = modal;
  modalWrapper.focus();
};

// Functions

const deleteButtons = document.querySelectorAll(".fa-trash-can");
// console.log(deleteButtons)

