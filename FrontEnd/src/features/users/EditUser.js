import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { SpinnerDiamond } from "spinners-react";
import { useGetUsersQuery } from "./usersApiSlice";

const EditUser = () => {
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  if (!user)
    return (
      <SpinnerDiamond
        style={{ margin: "80px 500px" }}
        size={"30%"}
        speed={70}
      />
    );

  const content = <EditUserForm user={user} />;
  return content;
};

export default EditUser;
