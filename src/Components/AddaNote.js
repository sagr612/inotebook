import React from "react";
import contextValue from "../context/Notes/Notecontext"
import { useContext,useState } from "react";


export default function AddaNote(props) {
    const context=useContext(contextValue);
    const {addNote}=context;

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handleClick=(e)=>
    {   
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showalert("Note added successfully","success");
    }

    const onChange=(e)=>
    {
        setNote({...note,[e.target.name]:e.target.value});
    }

  return (
    <div>
      <div className="my-3">
        <h2><strong>Add a Note</strong></h2>

        <form className="my-3">
          <div className="form-group my-3">
            <label htmlFor="Title">Tilte</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
            //   aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
              minLength={5} required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
              minLength={5} required
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="Tag">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
            />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
