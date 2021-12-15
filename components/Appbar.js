import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setUser, delUser } from "redux/auth";
import { delLoading, setLoading, setModal } from "redux/utils";
import Loading from "components/Loading";
import axios from "axios";

const AUTH_URL = process.env.AUTH_URL;

const Appbar = () => {
  const { utils, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get(AUTH_URL + "/auth/verifyToken");
      if (response.data) dispatch(setUser(response.data));
    } catch (error) {
      console.log(error);
    }
    dispatch(delLoading());
  };

  useEffect(() => {
    checkLoggedIn();

    const handleStart = () => dispatch(setLoading());
    const handleComplete = () => dispatch(delLoading());

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, []);

  useEffect(() => {
    if (auth.user) router.replace("/dashboard");
    else router.replace("/");
  }, [auth.user]);

  const handleClick = (event) => {
    switch (event.target.id) {
      case "1":
        dispatch(setModal());
        break;
      case "2":
        dispatch(delUser());
        break;

      default:
        break;
    }
  };

  if (utils.loading) return <Loading />;

  return (
    <div className="appbar__container">
      <h1>Memories</h1>
      <div>
        {auth.user ? (
          <div>
            <button className="button__green" id="1" onClick={handleClick}>
              Create
            </button>
            <button className="button__red" id="2" onClick={handleClick}>
              Logout
            </button>
          </div>
        ) : (
          <button className="button__primary">
            <a
              className="button button-appbar"
              target="_blank"
              href="https://auth.shanmukeshwar.me"
            >
              Login
            </a>
          </button>
        )}
      </div>
    </div>
  );
};

export default Appbar;
