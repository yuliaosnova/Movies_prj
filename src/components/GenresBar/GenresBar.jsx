import { useEffect, useState } from "react";
import { useGetGenresQuery } from "../../redux/genresSlice";
import { findDispalyedGenres } from "../../utils/utils";
import css from "../GenresBar/GenresBar.module.css";

const GenresBar = ({ placeHolder, getFilteredValue }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  const { data } = useGetGenresQuery();
  const allGenres = data?.genres ?? [];

  const opt = allGenres.map((item) => item.name);
  const visibleOptions = opt.slice(0, findDispalyedGenres());
  visibleOptions.push("All");

  const hiddenOptions = opt.slice(findDispalyedGenres, opt.length);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (hiddenOptions.find((item) => item === selectedValue)) {
      return selectedValue;
    }
    return placeHolder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);

    if (option === "All") {
      return getFilteredValue("all");
    }

    const GernreId = allGenres.find((genre) => {
      if (genre.name === option) return genre.id;
    });

    getFilteredValue(GernreId.id);
  };

  const isSelected = (option) => {
    if (option !== selectedValue) {
      return false;
    }
    return true;
  };


  return (
    <div className={css.GenresContainer}>
      <div className={css.GenresList}>
        {visibleOptions.map((option) => (
          <div
            key={option}
            className={
              isSelected(option) ? `${css.GenreSelected}` : `${css.Genre}`
            }
            onClick={() => onItemClick(option)}
          >
            {option}
          </div>
        ))}
      </div>

      <div className={css.DropdownContainer}>
        <div className={css.DropdownInput} onClick={handleInputClick}>
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className="dropdown-tools">
            <div className="dropdown-tool">▼</div>
          </div>
        </div>
        {showMenu && (
          <div className={css.DropdownMenu}>
            {hiddenOptions.map((option) => (
              <div
                key={option}
                className={
                  isSelected(option)
                    ? `${css.DropdownItemSelected}`
                    : `${css.DropdownItem}`
                }
                onClick={() => onItemClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenresBar;