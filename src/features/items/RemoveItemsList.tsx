import MyButton from "../../components/myButton";
import "../../css/RemoveItemsList.css";
import Item from "./Item";
import { useGetItemsQuery } from "./itemsApiSlice";

const RemoveItemsList = () => {
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery();

  const handleDeleteItemFromStore = () => {};

  let content;

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
            <div className="remove-items__item-div">
              <Item id={itemId} key={itemId} />
              <MyButton className="remove-items__remove-item-button" onClick={handleDeleteItemFromStore}>
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
