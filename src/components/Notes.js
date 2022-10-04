import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext'
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" })
    const ref = useRef(null);
    const refClose = useRef(null);
let navigate=useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }
        else{
            navigate("/login")
        }
    }, [])
    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({ id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
    }
    const handleClick = (e) => {
        // console.log("updating a note ",note)
        editNote(note.id,note.etitle,note.edescription,note.etag)

        refClose.current.click();

        // addNote(note.title, note.description, note.tag);
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form className='container my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onchange}  value={note.edescription}  />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={onchange} />
                                </div>

                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button> */}
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3' >
                <h2>Your Notes</h2>
                <div className='mx-3'>
                    {notes.length === 0 && "No notes to display.."}
                </div>
                {notes.map((notes) => {
                    return <Noteitem key={notes._id} updatenote={updatenote} notes={notes} />;
                })}
            </div>
        </div>
    )
}

export default Notes