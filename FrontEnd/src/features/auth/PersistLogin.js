import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { SpinnerDiamond } from "spinners-react";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  //handling React 18 strict mode
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [
    refresh,
    {
      isUninitialized, //the refresh function has not been called yet
      isLoading,
      isSuccess,
      isError,
      error,
    },
  ] = useRefreshMutation();

  //In Strict Mode ;every component : mount ==> unmount ==> re-mount
  //==>useEffect runs twice (in development in Strict mode)
  // we will take into consideration that useEffect will run twice ==> To prevent sending token twice!
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          //isSuccess from useRefreshMutation can be successful before credentials get set!!
          //so we will use one more flag ( setTrueSuccess(true)) ==> We can say we have got the data and those credentials have been set
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = (
      <SpinnerDiamond
        style={{ margin: "80px 500px" }}
        size={"30%"}
        speed={70}
      />
    );
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
