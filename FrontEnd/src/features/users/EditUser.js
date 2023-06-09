import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import EditUserForm from "./EditUserForm";
import { SpinnerDiamond } from "spinners-react";

const EditUser = () => {
  const { id } = useParams();
  /* EditUser just use useSelector (not querying the data again)==>that's why we don't have 
  a subscription (Redux DevTools) ==>we will create a Prefetch and wrap the dash route with it */
  const user = useSelector((state) => selectUserById(state, id));
  const content = user ? (
    <EditUserForm user={user} />
  ) : (
    <SpinnerDiamond style={{ margin: "80px 500px" }} size={"30%"} speed={70} />
  );
  return content;
};

export default EditUser;
