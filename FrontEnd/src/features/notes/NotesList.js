import useAuth from "../../hooks/useAuth";
import Note from "./Note";
import { useGetNotesQuery } from "./notesApiSlice";
import { SpinnerDiamond } from "spinners-react";

const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 15000, //ms  //Every 15 s it will re-query data
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <SpinnerDiamond
        style={{ margin: "80px 500px" }}
        size={"30%"}
        speed={70}
      />
    );

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids , entities } = notes;

    let filteredIds
    if (isManager || isAdmin) { 
        filteredIds=[...ids]
    } else {
      filteredIds=ids.filter(noteId=>entities[noteId].username===username)
    }

    const tableContent = ids?.length && filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)


    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">
              Username
            </th>
            <th scope="col" className="table__th note__created">
              Created
            </th>
            <th scope="col" className="table__th note__updated">
              Updated
            </th>
            <th scope="col" className="table__th note__title">
              Title
            </th>
            <th scope="col" className="table__th note__username">
              Owner
            </th>
            <th scope="col" className="table__th note__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default NotesList;
