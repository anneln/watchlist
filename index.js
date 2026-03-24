let title = document.getElementById("film-title");
const searchBtn = document.getElementById("search-btn");
const filmList = document.getElementById("film-list");
const filmRoll = document.getElementById("black-icon");

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
      window.alert("We haven't found this film in our database");
      return "";
    }

    const savedfilms = JSON.parse(localStorage.getItem("films")) || [];
    savedfilms.push(data);
    localStorage.setItem("films", JSON.stringify(savedfilms));

    const filmCard = ` <div class ="film-card">
   <img id="poster-img" src="${data.Poster}"/>
    <div class="description">
      <div class="name-rate">
        <h2>${data.Title}</h2>
        <img src="images/IconStar.svg"/>
        <p id="note">${data.imdbRating}</p>
      </div>
      <div class="details">
        <p>${data.Runtime}</p>
        <p>${data.Genre}</p>
        <button class="btn" id="addToList">
          <img id="plus" src="images/plusIcon.svg" alt="" aria-hidden="true" />
          WatchList
        </button>
      </div>
      <div class="resume">
        <p id="plot">${data.Plot}</p>
      </div>
      <hr>
    </div>
  </div>
  `;

    filmList.innerHTML += filmCard;
  } catch (err) {
    console.error("Something get wrong", err);
  }
}
