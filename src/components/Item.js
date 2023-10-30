import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {

  function toggleCartItem() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then(r => r.json())
      .then(updatedItem => onUpdateItem(updatedItem));
  }

  function handleDeleteClick() {
    // Delete the item from the API
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(r => r.json())
      .then(() => onDeleteItem(item));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        onClick={toggleCartItem}
        className={item.isInCart ? "remove" : "add"}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDeleteClick} className="remove">
        Delete
      </button>
    </li>
  );
}

export default Item;
