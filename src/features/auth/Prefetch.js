import { Outlet } from "react-router-dom";
import { store } from "../../app/store";
import { itemsApiSlice } from "../items/itemsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const items = store.dispatch(itemsApiSlice.endpoints.getItems.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      items.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};

export default Prefetch;
