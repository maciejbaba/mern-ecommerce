import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

type UsersState = {
  ids: EntityId[];
  entities: User[];
};

const initialState: UsersState = usersAdapter.getInitialState();

// basic type for user
type RawUser = {
  _id: string; // _id is default from API
  username: string;
  active: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

// type for user with id property instead of _id which is default from API
type User = Omit<RawUser, "_id"> & {
  id: string;
};

type UsersResponse = User[];

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    getUsers: builder.query<UsersResponse, void>({
      query: () => ({
        url: "/users",
        method: "GET",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData: RawUser[]) => {
        const loadedUsers: User[] = responseData.map((user: RawUser): User => {
          const newUser = { id: user._id, ...user };
          return newUser;
        });
        const newState = usersAdapter.setAll(initialState, loadedUsers);
        return newState as User[];
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    addNewUser: builder.mutation({
      query: (newUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...newUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (newUserData) => ({
        url: "/users",
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
        body: {
          ...newUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token") || "",
        },
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "User",
          id: arg.id,
        },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

export const selectUsers = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsers,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
