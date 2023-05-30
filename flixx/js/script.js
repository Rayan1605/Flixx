//Making a router
// It allows you to define different routes for different URL paths and
// specify the corresponding actions or components to be rendered when those routes are accessed.

//There is frameworks like react which has router built in them however we are going
//to make it with javascript

//Imagine you're playing a game with different levels,
// and each level has a different path or route you need to follow.
// A router in JavaScript is like a map or guide that helps you move between these levels.

const global = {
    currentPage: window.location.pathname//to check which page we are on
}
async function DisplayPopularTvshows() {
    const {results} = await getApiData('tv/popular');
    //So in the api it will send in a results object  so we are simple
    // destructuring it and getting the results object of the most popular movies and sending in the
    //end point
    results.forEach(show => {
        const showCard = document.createElement('div');
        showCard.classList.add('card');//adding a class to the div
        showCard.innerHTML = `   
              <a href="tv-details.html?id=${show.id}">
             ${
            movie.poster_path  //if there is a poster path then show the image the ? is like an if statement so yes it exist and the 
                // : is like an else statement so if it doesn't exist then show the no image
                ? `<img src = "https://image.tmdb.org/t/p/w500${show.poster_path}"
                       class = "card-img-top" 
                       alt="${show.name}" />` :
                ` <img src = "../images.no-image.jpg"
                     class = "card-img-top"  alt="${show.name}"/> <!-- Making the class name  -->
                  `
        }
             </a>
                <div class="card-body">
                <h5 class = "card-title">${show.name}</h5>
                <p class="card-text">
                <small class="text-muted">Released: ${show.first_air_date}</small>
           `
        document.querySelectorall('#popular-movies').appendChild(showCard)
    });

}
function showSpinner(){
   document.querySelector('.spinner').classList.add('show');
}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}
async function DisplayPopularMovies(){
    const {results} = await getApiData('movie/popular');
    //So in the api it will send in a results object  so we are simple
    // destructuring it and getting the results object of the most popular movies and sending in the
    //end point
     results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.innerHTML = `   
              <a href="movie-details.html?id=${movie.id}">
             ${
            movie.poster_path  //if there is a poster path then show the image the ? is like an if statement so yes it exist and the 
                // : is like an else statement so if it doesn't exist then show the no image
                ? `<img src = "https://image.tmdb.org/t/p/w500${movie.poster_path}"
                       class = "card-img-top" 
                       alt="${movie.title}" />` :
                     ` <img src = "../images.no-image.jpg"
                     class = "card-img-top"  alt="${movie.title}"/> <!-- Making the class name  -->
                    `
        }
             </a>
                <div class="card-body">
                <h5 class = "card-title">${movie.title}</h5>
                <p class="card-text">
                <small class="text-muted">Released: ${movie.release_date}</small>
           `
document.querySelectorall('#popular-movies').appendChild(movieCard)
     });


}
//This is going to fetch data from Tmdb Api
//to find the endpoint go look at the documentation
async function getApiData(endpoint){
const API_KEY = '8be4fed3f9278cd77673ccca099bcc62'  // just know don't do this so people can't get your api key
    //next make  a server to hide your api key
    const API_URL = `https://api.themoviedb.org/3/`;
    showSpinner();
//So remember first is url then endpoint and after that you can send what you want or what you have too
    //so for this api we have to send the api key and we choose to send a language we don't have too
const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
hideSpinner();
return  await response.json();
}
//Displaying the backdrop on Details page
function displayBackgroundImage(check, backdrop_path) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`;
   overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'position';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1'; // to make it faded
    overlayDiv.style.backgroundRepeat = 'no-repeat';

    if (check === 'movie') {
     document.querySelector('#movie-details').appendChild(overlayDiv)

    }else{
        document.querySelector('#show-details').appendChild(overlayDiv)
    }

}

//Display Movie Details
async  function DisplayMoviesDetails(){
    const movieid = window.location.search.split('=')[1]; //So we can get the number after the
    // = sign
    const movie = await getApiData(`movie/${movieid}`);
    //So we are getting the movie id and sending it to the api
    const div = document.createElement('div');
    displayBackgroundImage('movie',movie.backdrop_path);



    div.innerHTML = `
    <div class="details-top">
          <div>
        ${
        movie.poster_path  //if there is a poster path then show the image the ? is like an if statement so yes it exist and the 
            // : is like an else statement so if it doesn't exist then show the no image
            ? `<img src = "https://image.tmdb.org/t/p/w500${movie.poster_path}"
                       class = "card-img-top" 
                       alt="${movie.title}" />` :
            ` <img src = "../images.no-image.jpg"
                     class = "card-img-top"  alt="${movie.title}"/> <!-- Making the class name  -->
                    `
    }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
           ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
           <!-- This is how to map something and put it on the screen-->
<!-- So we are looping through an api using the map and then creating a list which include the name -->

             ${movie.genres.map((CurrentGenre) => "<li>${CurrentGenre.name}</li>").join('')}
            </ul>
            <a href=${movie.homepage} target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumbers(movie.budget)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumbers(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
        ${movie.production_companies.map((company) => `<li${company.name}</li>`).join('')}

</div>
        </div>
    `
    document.querySelector('#movie-details').appendChild(div);

}

function initSwiper() {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 3000,
           disableOnInteraction: false
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

//Display Slider Movies
async function DisplaySlider(){
   const {results} = await getApiData('movie/now_playing');

   results.forEach((movie) => {
     const div = document.createElement('div');
     div.classList.add('swiper-slide');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}=${movie.id}">
        <img src = "https://image.tmdb.org/t/p/w500${movie.poster_path}" alt = "${movie.title}" />
           </a>
           <h4 = class = "swiper-rating">
           <i class = "fas fa-star text-secondary"></i> ${movie.vote_average}/10
              </h4>
`
       document.querySelector('.swiper-wrapper').appendChild(div);
        initSwiper();
   })




}
//show Tv details
async function DisplayTvDetails(){
    const showId = window.location.search.split('=')[1];

    const show = await fetchAPIData(`tv/${showId}`);

    // Overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');

    div.innerHTML = `
  <div class="details-top">
  <div>
  ${
        show.poster_path
            ? `<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
  />`
            : `<img
  src="../images/no-image.jpg"
  class="card-img-top"
  alt="${show.name}"
/>`
    }
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${
        show.homepage
    }" target="_blank" class="btn">Visit show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number of Episodes:</span> ${
        show.number_of_episodes
    }</li>
    <li><span class="text-secondary">Last Episode To Air:</span> ${
        show.last_episode_to_air.name
    }</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">
    ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}
  </div>
</div>
  `;

    document.querySelector('#show-details').appendChild(div);
}
//Highlight active line
function highlightActiveLine(){
    //Below is getting all the links  in the nav bar
    const navLinks = document.querySelectorAll('.nav-link');
    //so when the link is the same as the page then it will be active
    navLinks.forEach(link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active'); //we use our css class called active
        }
    });
}
//Add commas to numbers
function addCommasToNumbers(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//init App

function init(){
    switch (global.currentPage) {
        case '/index.html':
            DisplayPopularMovies();
            DisplaySlider();
            break;
        case '/shows.html':
            DisplayPopularTvshows();
            break;
            case '/movies-details.html':
               DisplayMoviesDetails();
                break;
                case 'tv-details.html':
                    DisplayTvDetails();
                    break;
                    case '/search.html':
                        console.log("Movies Page");
                        break;

    }
    highlightActiveLine();
}

document.addEventListener('DOMContentLoaded', init)
