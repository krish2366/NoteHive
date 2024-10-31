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
        "authToken":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTk0ZjViZGYyNjU0Y2VmZjFkMjk1ZSIsImlhdCI6MTcyOTg5NTc2MH0.wv8Wtr0VmDnbwnLTU_vd6dlTd71vYi-Y3dMv20W9aGw",
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
        "authToken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTk0ZjViZGYyNjU0Y2VmZjFkMjk1ZSIsImlhdCI6MTcyOTg5NTc2MH0.wv8Wtr0VmDnbwnLTU_vd6dlTd71vYi-Y3dMv20W9aGw",
      },
      body: JSON.stringify(data),
    });

    const json = response.json();
    console.log(json);

    console.log(">>>>>>>>>>>>>>>>>>>");
    const note = {
      _id: "671d0e5f47161d73f36f88b0",
      user: "67194f5bdf2654ceff1d295e",
      title: title,
      description: description,
      tag: tag,
      date: "2024-10-26T15:44:31.010Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };




  // delete a note
  const deleteNote = async (id) => {
    console.log(id);
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTk0ZjViZGYyNjU0Y2VmZjFkMjk1ZSIsImlhdCI6MTcyOTg5NTc2MH0.wv8Wtr0VmDnbwnLTU_vd6dlTd71vYi-Y3dMv20W9aGw",
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
        "authToken":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTk0ZjViZGYyNjU0Y2VmZjFkMjk1ZSIsImlhdCI6MTcyOTg5NTc2MH0.wv8Wtr0VmDnbwnLTU_vd6dlTd71vYi-Y3dMv20W9aGw",
      },
      body: JSON.stringify(data),
    });

    const json = response.json();

    for (let i = 0; i < notes.length(); i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
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
