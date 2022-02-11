import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import API from "./components/API";

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
    <Router>
      <Header />

      <Routes>
        <Route path="/API" element={<API />}></Route>
        <Route
          path="/"
          element={
            <React.Fragment>
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
            </React.Fragment>
          }
        ></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
