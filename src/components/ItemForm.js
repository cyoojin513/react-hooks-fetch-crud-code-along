import React, { useState } from "react";

function ItemForm({renderingNewList}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function submitBtn(e) {
    e.preventDefault()
    const newList = {
      name: name,
      category: category,
      isInCart: false
    }
    fetch('http://localhost:4000/items', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newList)
    }).then(res => res.json())
      .then(list => renderingNewList(list))
    setName("")
    setCategory("Produce")
  }

  return (
    <form className="NewItem" onSubmit={submitBtn}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
