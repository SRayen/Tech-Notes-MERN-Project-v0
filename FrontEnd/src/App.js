import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import NewUserForm from "./features/users/NewUserForm";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* Prefetch component is used to fetch and subscribe to data from the server before rendering
         the nested routes in the application's dashboard  */}
        {/* To understand more : if you comment the route to Prefetch component and you open Redux
         DevTools : you will see that the Redux DevTools subscribes to the Redux store 
        and displays the data in the Redux DevTools only for 60s and then it will unsubscribe because:
         When data is fetched using Redux Toolkit Query, it is automatically cached in the Redux store
          with a default expiration time. By default, the cached data will expire after a certain period
           of time (usually 60 seconds) unless it is refetched */}
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>

            <Route path="notes">
              <Route index element={<NotesList />} />
              <Route path=":id" element={<EditNote />} />
              <Route path="new" element={<NewNote />} />
            </Route>
          </Route>{" "}
          {/*End Dash*/}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
