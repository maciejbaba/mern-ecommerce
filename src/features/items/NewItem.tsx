import React, { useState } from "react";
import { useAddNewItemMutation } from "./itemsApiSlice";
import "../../css/NewItem.css";
import MyButton from "../../components/MyButton";

const NewItem = () => {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [price, setPrice] = useState<number>(0);
  const [photoURL, setPhotoURL] = useState<string>();

  const [addNewItem, { isSuccess, isLoading, isError }] =
    useAddNewItemMutation();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    addNewItem({ name, description, price, photoURL });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setName("");
    setDescription("");
    setPrice(0);
    setPhotoURL("");
  };

  return (
    <main className="new-item">
      <h1>Add new item</h1>
      <form className="new-item__form">
        <div className="new-item__input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="new-item__input-container">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            placeholder="Enter a description..."
            maxLength={200}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="new-item__input-container">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="new-item__input-container">
          <label htmlFor="photoURL">Photo URL</label>
          <input
            type="text"
            id="photoURL"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>
        <div className="new-item__buttons">
          <MyButton className="new-item__buttons-add" onClick={handleSubmit}>
            Add
          </MyButton>
          <MyButton className="new-item__buttons-reset" onClick={handleReset}>
            Reset
          </MyButton>
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
