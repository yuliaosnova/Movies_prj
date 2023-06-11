import { useState } from "react";
import css from "./SearchBar.module.css";

export const SearchBar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("query:", searchQuery);

    onSubmit(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={css.Form}>
      <input
        className={css.Input}
        type="text"
        autoFocus
        onChange={handleChange}
      ></input>
      <button type="submit" className={css.SubmitBtn}>
        Search
      </button>
    </form>
  );
};
