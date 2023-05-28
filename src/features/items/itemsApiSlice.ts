import {
  createSelector,
  createEntityAdapter,
  EntityAdapter,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { RootState } from "../../app/store";

type RawItem = {
  _id: string;
  name: string;
  price: number;
  description: string;
  photoURL: string;
  createdAt: string;
  updatedAt: string;
};

export type Item = Omit<RawItem, "_id"> & {
  id: string;
};

const itemsAdapter: EntityAdapter<Item> = createEntityAdapter({});

type InitialState = ReturnType<typeof itemsAdapter.getInitialState>;

const initialState: InitialState = itemsAdapter.getInitialState();

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<EntityState<Item>, void>({
      query: () => ({
        url: "/items",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: RawItem[]) => {
        const loadedItems: Item[] = responseData.map((item: RawItem): Item => {
          const newItem = { id: item._id, ...item };
          return newItem;
        });
        return itemsAdapter.setAll(initialState, loadedItems);
      },
      providesTags: (result) =>
        result
          ? [
              ...result?.ids.map((id) => ({ type: "Item" as const, id })),
              { type: "Item", id: "LIST" },
            ]
          : [{ type: "Item", id: "LIST" }],
    }),
    addNewItem: builder.mutation({
      query: (newItemData) => ({
        url: "/items",
        method: "POST",
        body: {
          ...newItemData,
        },
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
    updateItem: builder.mutation({
      query: (newItemData) => ({
        url: "/items",
        method: "PATCH",
        body: {
          ...newItemData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Item", id: arg.id }],
    }),
    deleteItem: builder.mutation({
      query: ({ name }) => ({
        url: "/items",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: { name },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "Item",
          id: arg.id,
        },
      ],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useAddNewItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemsApiSlice;

export const selectItems = itemsApiSlice.endpoints.getItems.select();

const selectItemsData = createSelector(
  selectItems,
  (itemsResult) => itemsResult.data
);

export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemsIds,
} = itemsAdapter.getSelectors(
  (state: RootState) => selectItemsData(state) ?? initialState
);
