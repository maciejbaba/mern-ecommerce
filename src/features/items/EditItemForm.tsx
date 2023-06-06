import { Item } from "./itemsApiSlice";
import { useState } from "react";
import { useUpdateItemMutation } from "./itemsApiSlice";

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
    e: React.FormEvent<HTMLFormElement>
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

  return <div>EditItemForm</div>;
};

export default EditItemForm;
