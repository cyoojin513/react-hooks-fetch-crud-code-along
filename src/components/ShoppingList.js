import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(res => res.json())
      .then((data) => setItems(data))
  }, [])

  function addingNewList(newObj) {
    setItems([...items, newObj])
  }

  function updatingList(updatedObj) {
    const updatedResource = items.map((item) => {
      if (item.id === updatedObj.id) {
        return updatedObj
      } else {return item}
    })
    setItems(updatedResource)
  }

  function handleDelete(deletingItem) {
    const updatedList = items.filter((item) =>
      item.id !== deletingItem.id
      )
    setItems(updatedList)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm renderingNewList={addingNewList}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            renderingUpdated={updatingList}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
