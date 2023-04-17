import { useState } from "react";
import { useAddNewItemMutation } from "./itemsApiSlice";
import "../../css/NewItem.css";

const NewItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [photoURL, setPhotoURL] = useState("");

  const [addNewItem, { isSuccess, isLoading, isError }] =
    useAddNewItemMutation();
  const handleSubmit = e => {
    e.preventDefault();
    addNewItem({ name, description, price, photoURL });
  };

  const handleReset = e => {
    e.preventDefault();
    setName("");
    setDescription("");
    setPrice(0);
    setPhotoURL("");
  }

  return (
    <main className="new-item">
      <h1>Add new item</h1>
      <form onSubmit={handleSubmit} className="new-item__form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <label htmlFor="imageURL">Image URL</label>
        <input
          type="text"
          id="imageURL"
          value={photoURL}
          onChange={e => setPhotoURL(e.target.value)}
        />
        <button onClick={handleSubmit} className="new-item__form-button">Add</button>
        <button onClick={handleReset} className="new-item__form-button">Reset</button>
        {isSuccess && <p>Item added!</p>}
      </form>
    </main>
  );
};

export default NewItem;
