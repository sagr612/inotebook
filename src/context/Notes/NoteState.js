import NoteContext from "./Notecontext";
import { useState } from "react";

const NoteState = (props) => {
  // const s={
  //     "name":"deepak",
  //     "class":"university"
  // }
  // const [state,usestate]=useState(s);

  // const update=()=>{
  //     setTimeout(() => {
  //         usestate({
  //             "name":"deepak Bisht",
  //             "class":"university graphic era"
  //         })
  //     }, 1000);
  // }


  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);
  

  //get all notes
  const getNotes = async () => {
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
      }
    );
    const json=await response.json();
    setNotes(json);
  };

  


  //add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/addnotes`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      }
    );
    const json =await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    //to be fetched from api
    // const note = [
    //   {
    //     _id: "6215e3c8e29d065f73d161b3",
    //     user: "620d1aebbd5fcbe0fbb7c09d",
    //     title: title,
    //     description: description,
    //     tag: tag,
    //     date: "2022-02-23T07:39:52.089Z",
    //     __v: 0,
    //   },
    // ];
    setNotes(notes.concat(json));
  };


  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
          localStorage.getItem('token'),
        },
      }
    );
    const json=await response.json();
      console.log(json);

    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };



  //edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      }
    );
    const json =await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const note = newNotes[i];
      if (note._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
      setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
