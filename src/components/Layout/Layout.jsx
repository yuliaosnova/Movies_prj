import { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";

import { BsGithub } from "react-icons/bs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <div className={css.Enter}>
          <button className={css.EnterBtn}>log in</button>
          <button className={css.EnterBtn}>Sign up</button>
        </div>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className={css.Footer}>
        <p className={css.FooterContent}>
          ©2023 | All rights reserved |{" "}
          <a
            href="https://github.com/yuliaosnova"
            target="_blank"
            rel="noreferrer noopener"
          >
            <BsGithub />{" "}
          </a>
        </p>
      </footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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
