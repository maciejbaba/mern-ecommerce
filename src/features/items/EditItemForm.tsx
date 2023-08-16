import { Item } from "./itemsApiSlice";
import { useState } from "react";
import { useUpdateItemMutation } from "./itemsApiSlice";
import "../../css/EditItemForm.css";
import MyButton from "../../components/MyButton";

type EditItemFormProps = {
  item: Item;
};

const EditItemForm = ({ item }: EditItemFormProps) => {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [photoURL, setPhotoURL] = useState(item.photoURL);

  const [updateItem, { isSuccess, isLoading, isError, error }] =
    useUpdateItemMutation();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const handlePhotoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoURL(e.target.value);
  };

  const handleEditItemFormSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await updateItem({ id: item.id, name, description, price, photoURL });
    if (isError) {
      alert("Something went wrong");
    }
    if (isSuccess) {
      alert("Item has been updated successfully");
    }
  };

  return (
    <main className="edit-item">
      <h2>Edit Item</h2>
      <form action="" className="edit-item-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handlePriceChange}
        />

        <label htmlFor="photoURL">Photo URL</label>
        <input
          type="text"
          name="photoURL"
          value={photoURL}
          onChange={handlePhotoUrlChange}
        />
        <div
          style={{
            marginTop: ".5rem",
          }}
        >
          <MyButton
            className="button"
            onClick={(e) => handleEditItemFormSubmit(e)}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </MyButton>
        </div>
        {isSuccess && <p>Item has been updated</p>}
      </form>
    </main>
  );
};

export default EditItemForm;
