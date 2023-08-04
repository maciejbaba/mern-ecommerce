import { EntityId } from "@reduxjs/toolkit";
import MyButton from "../../components/myButton";
import "../../css/ManageItemsList.css";
import Item from "./Item";
import { useGetItemsQuery, useDeleteItemMutation } from "./itemsApiSlice";
import { useNavigate } from "react-router-dom";

const RemoveItemsList = (): JSX.Element => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery();

  const navigate = useNavigate();

  const [
    deleteItem,
    { isSuccess: isDeleted, isLoading: isDeleting, isError: isDeleteError },
  ] = useDeleteItemMutation();

  const handleEditItemButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: EntityId
  ) => {
    e.preventDefault();
    navigate(`/admin/manageItems/edit/${id}`);
  };

  const handleDeleteItemFromStore = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: EntityId
  ) => {
    e.preventDefault();
    const item = items?.entities[id];
    if (!item) return alert("Item not found");
    if (item) {
      await deleteItem(item);
      if (isDeleted) return alert("Item deleted");
      if (isDeleteError) return alert(error);
    }
  };

  let content = <p>Base value</p>;

  if (isLoading) {
    content = <p>Loading items...</p>;
  } else if (isSuccess) {
    content = (
      <main className="manage-items__main">
        <div className="manage-items__head">
          <h1>Items</h1>
          <MyButton
            className="manage-items__add-item-button"
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/manageItems/newItem");
            }}
          >
            Add new item
          </MyButton>
        </div>
        <div className="manage-items__items-list">
          {items.ids.map((itemId) => (
            <div className="manage-items__item-div" key={itemId}>
              <Item id={itemId} />
              <MyButton
                className="manage-items__edit-item-button"
                onClick={(e) => handleEditItemButton(e, itemId)}
              >
                Edit item
              </MyButton>

              <MyButton
                className="manage-items__remove-item-button"
                onClick={(e) => handleDeleteItemFromStore(e, itemId)}
              >
                Delete item from the store
              </MyButton>
            </div>
          ))}
        </div>
      </main>
    );
  } else if (isError && "data" in error) {
    content = (
      <div>
        <p>Snap! ERROR</p>
        <p>
          {error.status} {JSON.stringify(error)}
        </p>
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default RemoveItemsList;
