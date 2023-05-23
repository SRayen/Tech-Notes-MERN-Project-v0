import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

/* EditUser / EditNote just use useSelector (not querying the data again)==>that's why we don't have 
  a subscription (Redux DevTools) ==>we will create a Prefetch and wrap the dash route with it */

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    /*Manually subscription to Users & Notes ==> We will have access to that state and it will 
    not expire (in 60s (default time))*/
    /*Prefetching relies on the powerful api.endpoints.<queryName>.initiate() method that underlies much 
    RTK Query's internals. For RTK Query to process and store initiate() calls properly they have to be
     sent into the redux store with store.dispatch().*/

    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      //This ensures that the subscriptions are properly cleaned up to avoid memory leaks.
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
