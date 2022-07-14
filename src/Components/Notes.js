import React from "react";
import { useContext, useRef } from "react";
import AddaNote from "./AddaNote";
import Notesitem from "./Notesitem";
import contextValue from "../context/Notes/Notecontext";
import { useEffect ,useState} from "react";
import { useHistory } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(contextValue);
  const { notes, getNotes ,editNote} = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const history=useHistory();

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();
    }
    else
    {
    history.push("/login");
    }
    //eslint-disable-next-line
  }, []);

  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"Default"});


  const updateNote = (currentNote) => {
    // console.log("hi");
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };

  const handleClick=(e)=>
    {   
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refClose.current.click();
    }
    const onChange=(e)=>
    {
        setNote({...note,[e.target.name]:e.target.value});
    }

  return (
    <>
      <AddaNote showalert={props.showalert}></AddaNote>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-3">
                  <label htmlFor="Title">Tilte</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    minLength={5} required
                    //   aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="Description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    minLength={5} required
                    onChange={onChange}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="Tag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <h2><strong>Your Notes</strong></h2>
        <div className="container">
        {notes.length===0 && "No notes for display"}
        </div>
        {notes.map((note) => {
          return (
            <Notesitem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showalert={props.showalert}
            ></Notesitem>
          );
        })}
      </div>
    </>
  );
}
