import React, { useState, useReducer } from "react";
import "./index.css";
import { v4 as uuid } from "uuid";

const initalNotesState = {
  sonOluşturanYaratma: null,
  toplamNote: 0,
  notes: [],
};

const noteReducer = (prevState, action) => {
  switch (action.type) {
    case "EKLE_NOT": {
      const yeniState = {
        sonOluşturanYaratma: new Date().toTimeString().slice(0, 8),
        toplamNote: prevState.notes.length + 1,
        notes: [...prevState.notes, action.payload],
      };
      console.log("", yeniState);
      return yeniState;
    }
    case "DELETE_NOTE": {
      const yeniState = {
        ...prevState,
        toplamNote: prevState.notes.length - 1,
        notes: prevState.notes.filter((note) => note.id !== action.payload.id),
      };
      console.log(yeniState);
      return yeniState;
    }
  }
};

function App() {
  const [noteYer, setNoteYer] = useState("");
  const [notesState, dispatch] = useReducer(noteReducer, initalNotesState);
  const addNote = (event) => {
    event.preventDefault();
    if (!noteYer) {
      return;
    }
    const yeniNote = {
      id: uuid(),
      yazı: noteYer,
      yuvarlama: Math.floor(Math.random() * 20),
    };
    dispatch({ type: "EKLE_NOT", payload: yeniNote });
    setNoteYer("");
  };

  const dropNote = (event) => {
    event.target.style.left = `${event.pageX - 10}px`;
    event.target.style.top = `${event.pageY - 10}px`;
  };
  const dragOver = (event) => {};
  return (
    <div className="App" onDragOver={dragOver}>
      <p></p>
      <h1>Not ({notesState.toplamNote})</h1>
      <p>{notesState.toplamNote > 0 ? `En son  ${notesState.sonOluşturanYaratma}` : " "}</p>
      <form onSubmit={addNote} className="form">
        <textarea
          value={noteYer}
          onChange={(event) => setNoteYer(event.target.value)}
          placeholder="Not yaz"
        ></textarea>
        <button>Ekle</button>
      </form>

      {notesState.notes.map((note) => (
        <div
          style={{ transform: `rotate(${note.yuvarlama}deg)` }}
          className="note"
          draggable="true"
          onDragEnd={dropNote}
          key={note.id}
        >
          <pre className="text">{note.yazı}</pre>
          <div className="close">
            <i
              onClick={() => dispatch({ type: "DELETE_NOTE", payload: note })}
              class="fas fa-times-circle"
            ></i>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
