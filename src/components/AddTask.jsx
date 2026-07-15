import { useState } from "react";

function AddTask({ onAdd }) {

  const [title, setTitle] = useState("");

  const handleSubmit = () => {

    if (title.trim() === "") return;

    onAdd(title);

    setTitle("");
  };

  return (
    <div className="input-section">

      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Add
      </button>

    </div>
  );
}

export default AddTask;