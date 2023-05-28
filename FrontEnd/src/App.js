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
import PersistLogin from "./features/auth/PersistLogin";
import { ROLES } from "./config/roles";
import RequireAuth from "./features/auth/RequireAuth";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("Rayen Tech-Notes");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* PROTECTED ROUTES */}
        
        {/* PersistLogin:  handle the persistence of the login state or authentication token across
        different sessions. It is likely responsible for restoring the user's
        authentication state when the application is reloaded or reopened. */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            {/* Prefetch : The goal of prefetching is to make data fetch before the user navigates to a page or attempts to load
          some known content. */}
            {/* The prefetch feature allows you to fetch data before it's explicitly
        requested by the UI, anticipating the user's needs and reducing
        perceived loading times */}
            {/* To understand more : You can see the diff in Redux DevTools with and without prefetching (no subscribes & no data) */}
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />

                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
              {/*End Dash*/}
            </Route>
          </Route>
        </Route>
        {/*End Protected Routes*/}
      </Route>
    </Routes>
  );
}

export default App;
