import { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppBar } from "../AppBar/AppBar";
import css from "./Layout.module.css";

export const Layout = () => {
  return (
    <>
      <header className={css.Header}>
        <nav>
          <NavLink to="/" className={css.NavItem}>
            Home
          </NavLink>
          <NavLink to="/more" className={css.NavItem}>
            MORE MOVIES
          </NavLink>
          <NavLink to="/movies" className={css.NavItem}>
            Search
          </NavLink>
          <NavLink to="/collection" className={css.NavItem}>
            My collection
          </NavLink>
        </nav>
        <AppBar />
      </header>
      <main>
        <Suspense fallback={<></>}>
          <Outlet />
        </Suspense>
      </main>
      <footer></footer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};
