import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { SpinnerDiamond } from "spinners-react";

const NewNote = () => {
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length)
    return (
      <SpinnerDiamond
        style={{ margin: "80px 500px" }}
        size={"30%"}
        speed={70}
      />
    );

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;
