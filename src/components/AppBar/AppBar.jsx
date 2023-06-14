import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getAuth,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { app, googleAuthProvider } from "../../firebase";
import { UserMenu } from "../UserMenu/UserMenu";
import { logIn } from "../../redux/userSlice";
import css from "./AppBar.module.css";


export const AppBar = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((hypotheticalUser) => {
      if (hypotheticalUser !== null) {
        return dispatch(logIn({login: hypotheticalUser.displayName, uid:hypotheticalUser.uid }));
      }
    });
    return unsub;
  }, [auth, dispatch]);


  function clickHandler() {
    googleAuthProvider.setCustomParameters({
      prompt: "select_account",
    });

    signInWithRedirect(auth, googleAuthProvider);
    getRedirectResult(auth)
      .then((result) => {
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      })

      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <div className={css.Enter}>
      {!isLoggedIn && (
        <button className={css.EnterBtn} onClick={clickHandler}>
          Log In with Google
        </button>
      )}
      {isLoggedIn && <UserMenu />}
    </div>
  );
};
