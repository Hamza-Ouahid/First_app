import React, { useState } from "react";

function CreateArea(props) {
  const [isexpanded, setisexpanded] = useState(false);
  const [note, setnote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setnote((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }
  function onSubmit(event) {
    props.onAdd(note);
    setnote({
      title: "",
      content: "",
    });
    event.preventDefault();
  }
  function expanding() {
    setisexpanded(true);
  }
  return (
    <div>
      <form>
        {isexpanded && (
          <input
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
          />
        )}
        <textarea
          onClick={expanding}
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Take a note..."
          rows={isexpanded ? 3 : 1}
        />
        {isexpanded && <button onClick={onSubmit}>Add</button>}
      </form>
    </div>
  );
}

export default CreateArea;
