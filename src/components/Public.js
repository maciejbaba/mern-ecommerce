import { Link } from "react-router-dom";
import "../css/Public.css";
import { useSelector } from "react-redux";
import { selectAllItems } from "../features/items/itemsApiSlice";
import { useGetItemsQuery } from "../features/items/itemsApiSlice";

const Public = () => {

  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetItemsQuery("itemsList", {
    pollingInterval: 60000,
  })

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  }

  if (isSuccess) {
    console.log(items);
    content = <div>{items.ids}</div>
  }


  return <main className="public">{content}</main>;
};

export default Public;
