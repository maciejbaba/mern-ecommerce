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
  };

  return (
    <main className="new-item">
      <h1>Add new item</h1>
      <form onSubmit={handleSubmit} className="new-item__form">
        <div className="new-item__input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="new-item__input-container">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            value={description}
            placeholder="Enter a description..."
            maxLength={200}
            rows={4}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="new-item__input-container">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div className="new-item__input-container">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            id="imageURL"
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
          />
        </div>
        <div className="new-item__buttons">
          <button onClick={handleSubmit}>Add</button>
          <button onClick={handleReset}>Reset</button>
        </div>
        <div className="new-item__result">
          {isSuccess && <p>Item added!</p>}
          {isLoading && <p>Adding item...</p>}
          {isError && <p>Something went wrong!</p>}
        </div>
      </form>
    </main>
  );
};

export default NewItem;
