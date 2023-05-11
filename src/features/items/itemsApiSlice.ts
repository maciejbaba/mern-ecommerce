import {
  createSelector,
  createEntityAdapter,
  EntityAdapter,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

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

type ItemsEntity = {
  ids: string[];
  entities: {
    [id: string]: Item;
  };
};

const itemsAdapter: EntityAdapter<ItemsEntity> = createEntityAdapter({});

type InitialState = ReturnType<typeof itemsAdapter.getInitialState>;

const initialState: InitialState = itemsAdapter.getInitialState();

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: "/items",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: RawItem[]) => {
        const loadedItems = responseData.map((item: RawItem): Item => {
          const newItem = { id: item._id, ...item };
          return newItem;
        });
        return itemsAdapter.setAll(initialState, loadedItems);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Item", id })),
          ];
        }
      },
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
      query: ({ id }) => ({
        url: "/items",
        method: "DELETE",
        body: { id },
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
  (state) => selectItemsData(state) ?? initialState
);
