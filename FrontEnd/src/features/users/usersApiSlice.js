import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

//get normalized state (data that has ids array & entities)
const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET USERS
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      //A number (second) that determines how long the unused data for the query will be kept in the cache.
    //   keepUnusedDataFor: 5,
      //transformResponse: used to transform the API response data before storing it in the Redux store.
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        //could possibly get a result that doesn't have ids (when an error has occurred /
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    //ADD USER
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    //UPDATE USER
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    //DELETE USER
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;

//returns the query object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();
//creates memorized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data //normalized state object with ids & entities
);
//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById, 
  selectIds: selectUserIds,
  //Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
