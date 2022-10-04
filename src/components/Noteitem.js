import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'
const Noteitem = (props) => {
    const { notes, updatenote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>

            <div className="card my-3" >
                <div className="card-body">
                    {/* <div className='d-flex align-items-center' > */}
                    <h5 className="card-title">{notes.title}</h5>

                    {/* </div> */}
                    <p className="card-text">{notes.description}</p>
                    {/* <i className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(notes._id) }} ></i> */}
                    {/* <i className="fa-solid fa-pen mx-2" onClick={() => { updatenote(notes) }} ></i> */}
                    <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(notes._id) }} />
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updatenote(notes) }} />
                </div>
            </div>
        </div>

    )
}

export default Noteitem