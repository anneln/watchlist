const myMovies = document.getElementById("my-movies");

function renderWatchlist() {
  const savedFilms = JSON.parse(localStorage.getItem("watchlist")) || [];
  myMovies.innerHTML = "";
  if (savedFilms.length === 0) {
    myMovies.innerHTML = `<div>
  <p>Your watchlist is looking a little empty...</p>
  <div><img src="images/plusIcon.svg" alt="" aria-hidden="true">
  <p>Let’s add some movies!</p>
  </div>
  </div>`;
  } else {
    savedFilms.forEach((film) => {
      const filmCard = document.createElement("div");
      filmCard.classList.add("film-card");
      filmCard.innerHTML = ` 
   <img id="poster-img" src="${film.Poster}"/>
    <div class="description">
      <div class="name-rate">
        <h2>${film.Title}</h2>
        <img src="images/IconStar.svg"/>
        <p id="note">${film.imdbRating}</p>
      </div>
      <div class="details">
        <p>${film.Runtime}</p>
        <p>${film.Genre}</p>
        <button class="btn removeToList">
          <img id="remove" src="images/RemoveIcon.svg" alt="" aria-hidden="true" />
          Remove
        </button>
      </div>
      <div class="resume">
        <p id="plot">${film.Plot}</p>
      </div>
      <hr>
    </div>
  `;

      const removeBtn = filmCard.querySelector(".removeToList");
      removeBtn.addEventListener("click", function () {
        let newList = JSON.parse(localStorage.getItem("watchlist")) || [];
        newList = newList.filter((f) => f.imdbID !== film.imdbID);
        localStorage.setItem("watchlist", JSON.stringify(newList));
        renderWatchlist();
      });
      myMovies.appendChild(filmCard);
    });
  }
}
renderWatchlist();
