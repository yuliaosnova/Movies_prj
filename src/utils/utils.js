//Функція, яка повертає жанр за id
export function getGenre(arrow, ids) {
  let names = [];

  for (let id of ids) {
    for (let a of arrow) {
      if (a.id === id) {
        names.push(a.name);
        break;
      }
    }
  }
  return names;
}

export function getNamesFromArrow(arr) {
  let names = [];

  arr.map((item) => names.push(item.name));

  return names;
}

export function cutDate(date) {
  const regexp = /([0-9]{4}(?=-))/g;
  const hits = date.match(regexp);
  if (hits !== null) return hits[0];

  return date;
}

export function setAddButtonText(id, collectedMovies) {
  const alreadyInCollection = collectedMovies.find((movie) => movie.id === id);
  if (alreadyInCollection) {
    return "REMOVE FROM COLLECTION";
  } else {
    return "ADD TO COLLECTION";
  }
}

// Функція для притиснення футера
function footer() {
  const main = document.getElementsByTagName("main")[0];
  const footer = document.getElementsByTagName("footer")[0];

  main.style.paddingBottom = footer.clientHeight + "px";
}

window.addEventListener("load", footer);
window.addEventListener("resize", footer);
