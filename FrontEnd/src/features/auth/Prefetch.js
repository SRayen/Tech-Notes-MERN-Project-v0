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
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
