// src/App.jsx
import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import "./index.css";

const App = () => {
  const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem("cards");
    return stored ? JSON.parse(stored) : [];
  });

  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = () => {
    if (!input.trim()) return;
    const newCard = {
      id: Date.now(),
      title: input,
      liked: false,
    };
    setCards([newCard, ...cards]);
    setInput("");
  };

  const toggleLike = (id) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c)));
  };

  const deleteCard = (id) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const updateCard = (id, newTitle) => {
    setCards(cards.map((c) => (c.id === id ? { ...c, title: newTitle } : c)));
  };

  const filteredCards = cards.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>📇 Contact Card App</h1>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Enter card title"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addCard}>Add</button>

        <input
          type="text"
          placeholder="Search cards..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-grid">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            liked={card.liked}
            onLike={toggleLike}
            onDelete={deleteCard}
            onUpdate={updateCard}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
