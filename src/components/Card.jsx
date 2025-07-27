// src/components/Card.jsx
import React, { useState } from "react";

const Card = ({ id, title, liked, onLike, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleUpdate = () => {
    onUpdate(id, newTitle);
    setEditing(false);
  };

  return (
    <div className={`card ${liked ? "liked" : ""}`}>
      {editing ? (
        <>
          <input
            className="edit-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>Status: {liked ? "Liked ❤️" : "Not Liked 🤍"}</p>
          <div className="buttons">
            <button onClick={() => onLike(id)}>Like</button>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
