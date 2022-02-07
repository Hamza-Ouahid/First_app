import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const getNotes = async () => {
      const notesFromServer = await fetchNotes();
      setNotes(notesFromServer);
    };
    getNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch("http://localhost:5000/notes");
    const data = await res.json();
    return data;
  };
  async function addNote(note) {
    const res = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: {
        "Content-type": " application/json",
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    setNotes([...notes, data]);
  }

  // function aaddNote(note) {
  //   setNotes((prevnotes) => {
  //     return [...prevnotes, note];
  //   });
  // }
  async function deleteNote(id) {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    });
    setNotes(notes.filter((note) => note.id !== id));
    // setNotes((prevnotes) => {
    //   return prevnotes.filter((noteitem, index) => {
    //     return index !== id;
    //   });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteitem) => {
        return (
          <Note
            key={noteitem.id}
            id={noteitem.id}
            title={noteitem.title}
            content={noteitem.content}
            onDelete={deleteNote}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
