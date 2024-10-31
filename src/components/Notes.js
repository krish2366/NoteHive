import React , { useContext, useEffect } from 'react'
import noteContext from "../context/notes/noteContext";
import Noteitem from './Noteitem';
import AddNote from "./AddNote";

const Notes = () => {

    const context = useContext(noteContext)
    const {notes,getAllNotes} = context
  
    useEffect(() => {
        getAllNotes()
    },[])

  return (
    <>
        <AddNote />
        <div className="container p-5">
            <h1>Your Notes</h1>
            <div className="row">
                {notes.map((note,id)=>{
                return (
                    <Noteitem key={id} note={note}/>
                )
                })}

            </div>
        </div>
    
    </>
  )
}

export default Notes
