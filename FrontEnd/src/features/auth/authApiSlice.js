import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      //RTK Query provides an onQueryStarted function that we can call inside of an EndPoint
      //arg is just needs to be there as a first param
      /*Doing all of this inside of onQueryStarted keeps us from needing to import useDispatch into a component
      and then dispatching each one of these in every component, So we can put it here and then we can just
       call this Logout Mutation that we would import into the component and it will take care for everything!
       ***It's a more efficient way of doing that!*/
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          //const { data } =
          await queryFulfilled;
          //console.log(data)   //Expected Output : message from API: "Cookie Cleaned"
          //Will make token to null in our local state
          dispatch(logOut());
          //Then the apiSlice which is separate from the AuthSlice :need to be cleared as well
          /*resetApiState : will clear out the cache and the query subscriptions and everything to do with
           our apiSlice */

          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000); //Like this there is a plenty of time to go ahead and confirm that it has unmounted that list component whether
          //notes || users list and can reset the api state and then gets rid of that subscriptions
        } catch (err) {
          console.log(err);
        }
      },
    }),
    //Just define the query  which goes to authRefresh , and send a Get Request that includes "cookie" ==> We will get a new AccessToken
    /* We send a GET request for the refresh endpoint because we are not sending anything in the body of the request as we would with POST
     and the others. 
     Why we have used mutation and no Query ? ==> because mutation refers to our state - and we will be replacing the Access Token in
      our Redux state with (Since the operation of refreshing the token modifies the state of the application, it is considered a mutation.) */
    /* In RTK Query, mutations are used when performing operations that modify data or have side effects, such as creating, updating, or deleting data. Queries, on the other hand, are used for retrieving data without modifying the state.*/
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      //Like this==>we don't need to import useDispatch in the action creator in every component that we want to use it in!
      //refreshMutation will go ahead and set the credentials for us as well 
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (error) {
            console.log(error)
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
