import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/userSlice";
import { getAuth, signOut } from "firebase/auth";
import css from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.user.login);

  function clickHandler() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logOut());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={css.UserMenuContainer}>
      <p className={css.UserName}>{login}</p>

      <button type="button" onClick={clickHandler} className={css.EnterBtn}>
        Log out
      </button>
    </div>
  );
};
