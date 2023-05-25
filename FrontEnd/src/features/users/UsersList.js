import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import { SpinnerDiamond } from "spinners-react";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery('usersList', {
    pollingInterval: 20000, //ms  //Every 1 mn it will re-query data
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
    const { ids } = users;
    const tableContent = ids?.length && ids.map((userId) => <User key={userId} userId={userId} />)


    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th" user__username>
              Username
            </th>
            <th scope="col" className="table__th" user__username>
              Roles
            </th>
            <th scope="col" className="table__th" user__username>
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
export default UsersList;
