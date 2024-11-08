import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem("token")){
      getAllNotes();
    }else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({id: "",etitle: "", edescription: "", etag: "" });

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tag,
    });
    props.showAlert("Note edited successfully","success")
  };

  const handleClick = (e) => {
    refClose.current.click()
    console.log(note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);
  
  return (
    <>
      <AddNote showAlert={props.showAlert} />
    
      <div>
        <button
          type="button"
          ref={ref}
          className="btn btn-primary m-5 d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Edit Note
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      value={note.etitle}
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      value={note.edescription}
                      className="form-control"
                      id="edescription"
                      name="edescription"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      value={note.etag}
                      className="form-control"
                      id="etag"
                      name="etag"
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
                <button
                  disabled={note.etitle.length <5 || note.edescription.length<5}
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-5">
        <h1>Your Notes</h1>
        <div className="container">
          {notes.length === 0 && "No note to display"}
        </div>
        <div className="row">
          {notes.map((note, id) => {
            return <Noteitem showAlert={props.showAlert} key={id} note={note} updateNote={updateNote} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Notes;
