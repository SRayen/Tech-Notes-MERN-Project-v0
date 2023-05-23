import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./notesApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import EditNoteForm from "./EditNoteForm";
import { SpinnerDiamond } from "spinners-react";

const EditNote = () => {
  const { id } = useParams();

  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <SpinnerDiamond
        style={{ margin: "80px 500px" }}
        size={"30%"}
        speed={70}
      />
    );

  return content;
};
export default EditNote;
