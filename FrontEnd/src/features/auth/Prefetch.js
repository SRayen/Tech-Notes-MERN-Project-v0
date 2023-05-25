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

    /* In Redux Toolkit Query (RTK-Query), the prefetch function is used to initiate a "prefetch" action for a specific API endpoint.
     This action triggers a request to fetch the data for that endpoint and stores it in the cache, making it available for subsequent
     use */

    /* { force: true }: This is an optional configuration object that can be passed to the prefetch function. In this case,
     force: true is used to indicate that the data should be refetched even if it exists in the cache. This can be useful when you
      want to explicitly refresh the data.*/
    store.dispatch(
      notesApiSlice.util.prefetch("getNotes", "notesList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
