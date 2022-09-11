"use strict";

const noteTitle = document.querySelector("#noteName");
const noteBody = document.querySelector("#noteBody");
const submitButtom = document.querySelector("#submitButton");
const newNotes = document.querySelector("#notesArea");
const errorMessage = document.querySelector("#msgError");

const createNote = (e) => {
  e.preventDefault();
  if (noteTitle.value === "" || noteBody.value === "") {
    errorMessage.innerHTML = "Please fill the fields before submiting the note";
  } else {
  const newNote = document.createElement("div");
  newNote.classList.add("note", "mb-6", "border-2", "border-orange-500", "p-2", "rounded-lg", "bg-white");
  newNote.innerHTML = `
    <button class="deleteButton bg-slate-400 w-[20px] h-[20px] rounded-full flex ml-auto mr-0 font-bold items-center justify-center">X</button>
    <h2 class="text-xl text-center">Title: ${noteTitle.value}</h2>
    <p class="whitespace-pre-wrap">Note: <br>${noteBody.value}</p>
    `;
  document.querySelector("#notesArea").appendChild(newNote);
  noteTitle.value = "";
  noteBody.value = "";
  }
};

const deleteNote = (e) => {
  if (e.target.classList.contains("deleteButton")) {
    e.target.parentElement.remove();
  }
};

submitButtom.addEventListener("click", createNote);
newNotes.addEventListener("click", deleteNote);

const saveNotes = (e) => {
  const notes = document.querySelectorAll(".note");
  const notesArray = [];
  notes.forEach((note) => {
    notesArray.push({
      title: note.querySelector("h2").innerText,
      body: note.querySelector("p").innerText,
    });
  });
  localStorage.setItem("notes", JSON.stringify(notesArray));
};

const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes"));
  if (notes) {
    notes.forEach((note) => {
      const newNote = document.createElement("div");
      newNote.classList.add("note", "mb-6", "border-2", "border-orange-500", "p-2", "rounded-lg", "bg-white");
      newNote.innerHTML = `
        <button class="deleteButton bg-slate-400 w-[20px] h-[20px] rounded-full flex ml-auto mr-0 font-bold items-center justify-center">X</button>
        <h2 class="text-xl text-center">${note.title}</h2>
        <p class="whitespace-pre-wrap">${note.body}</p>
        `;
      document.querySelector("#notesArea").appendChild(newNote);
    });
  }
};

document.addEventListener("DOMContentLoaded", getNotes);
document.addEventListener("click", saveNotes);

function errorMsg() {
  setTimeout(() => (errorMessage.innerHTML = ""), 3000);
}

addEventListener("click", errorMsg);
