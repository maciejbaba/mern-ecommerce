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
  const [photoUrl, setPhotoUrl] = useState(item.photoURL);

  const [updateItem, { isLoading, isError, error }] = useUpdateItemMutation();

  return <div>EditItemForm</div>;
};

export default EditItemForm;
