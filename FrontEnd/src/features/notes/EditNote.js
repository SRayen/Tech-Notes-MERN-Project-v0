import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { SpinnerDiamond } from "spinners-react";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";

const EditNote = () => {
  console.log("hello from  edit note");
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length)
    return (
      <SpinnerDiamond
        style={{ margin: "80px 500px" }}
        size={"30%"}
        speed={70}
      />
    );

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};
export default EditNote;
