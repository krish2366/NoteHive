import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  
  
  // get All notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchall`, {
      method: "GET",
      headers: {
        "authToken": localStorage.getItem("token"),
      },
    });
    
    const data = await response.json();
    setNotes(data);
  };

  
  // add a note
  const addNote = async (title, description, tag) => {
    const data = {
      title: title,
      description: description,
      tag: tag,
    };

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    const note = await response.json();
    console.log(note.savedNote);
    setNotes(notes.concat(note.savedNote));

    console.log(">>>>>>>>>>>>>>>>>>>");
    
  };




  // delete a note
  const deleteNote = async (id) => {
    console.log(id);
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token"),
      },
    });
    const data = response.json()
    console.log(data)

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  
  // edit a note
  const editNote = async (id, title, description, tag) => {
    const data = {
      title: title,
      description: description,
      tag: tag,
    };

    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    console.log(json)


    let copiedNotes = JSON.parse(JSON.stringify(notes))
    
    for (let i = 0; i < copiedNotes.length; i++) {
      const element = copiedNotes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;
      }
    }
    setNotes(copiedNotes)
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote , getAllNotes}}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
