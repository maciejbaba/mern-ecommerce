import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectItemById } from "./itemsApiSlice";
import { RootState } from "../../app/store";
import EditItemForm from "./EditItemForm";

const EditItem = () => {
  const { id } = useParams();

  if (!id) {
    return <p>"Missing item id"</p>;
  }
  const item = useSelector((state: RootState) => selectItemById(state, id));

  if (!item) {
    return <p>"Item not found"</p>;
  }

  return <EditItemForm item={item} />;
};

export default EditItem;
