import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  // add a note
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
     
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // api to be called
    // console.log(json);
    setNotes(json);

  }


  // add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    // const json= response.json(); 
    // api to be called
    // console.log("Adding a new note");
    // const note = await response.json();
    // console.log(note);
    getNote();

  }

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

    });
    getNote();
  }


  // edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, description, tag })
    });
    getNote();
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
