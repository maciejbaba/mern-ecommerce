import { EntityId } from "@reduxjs/toolkit";
import MyButton from "../../components/myButton";
import "../../css/RemoveItemsList.css";
import Item from "./Item";
import { RootState } from "../../app/store";
import {
  useGetItemsQuery,
  useDeleteItemMutation,
  selectItemById,
} from "./itemsApiSlice";
import { useSelector } from "react-redux";

const RemoveItemsList = (): JSX.Element => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery();

  const [deleteItem, { isSuccess: isDeleted ,isLoading: isDeleting, isError: isDeleteError }] =
    useDeleteItemMutation();

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
      <main className="remove-items__main">
        <div>
          <h1>Items</h1>
        </div>
        <div className="remove-items__items-list">
          {items.ids.map((itemId) => (
            <div className="remove-items__item-div" key={itemId}>
              <Item id={itemId} />
              <MyButton
                className="remove-items__remove-item-button"
                onClick={(e) => handleDeleteItemFromStore(e, itemId)}
              >
                Delete item from store
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
