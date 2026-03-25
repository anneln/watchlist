let title = document.getElementById("film-title");
const searchBtn = document.getElementById("search-btn");
const filmList = document.getElementById("film-list");
const filmRoll = document.getElementById("empty-state");
const myMovies = document.getElementById("my-movies");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const titleEl = title.value;
  console.log(titleEl);
  getAFilm(titleEl);
});

async function getAFilm(titleEl) {
  filmRoll.style.display = "none";
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?t=${titleEl}&apikey=4718a2f1`,
    );
    const data = await res.json();
    if (!data.Title) {
      return (filmList.innerHTML = `<p id="Not-found">Unable to find what you’re looking for.<br> Please try another search.</p>`);
    }

    const filmCard = document.createElement("div");
    filmCard.classList.add("film-card");
    filmCard.innerHTML = ` 
   <img class="poster-img" src="${data.Poster}"/>
    <div class="description">
      <div class="name-rate">
        <h2>${data.Title}</h2>
        <img src="images/IconStar.svg"/>
        <p class="note">${data.imdbRating}</p>
      </div>
      <div class="details">
        <p>${data.Runtime}</p>
        <p>${data.Genre}</p>
        <a href="watchlist.html" class="btn addToList">
          <img id="plus" src="images/plusIcon.svg" alt="" aria-hidden="true" />
          WatchList
        </a>
      </div>
      <div class="resume">
        <p class="plot">${data.Plot}</p>
      </div>
    </div>
  `;
    const addBtn = filmCard.querySelector(".addToList");
    addBtn.addEventListener("click", function () {
      const savedfilms = JSON.parse(localStorage.getItem("watchlist")) || [];
      savedfilms.push(data);
      localStorage.setItem("watchlist", JSON.stringify(savedfilms));
    });
    filmList.appendChild(filmCard);
  } catch (err) {
    console.error("Something get wrong", err);
  }
}
