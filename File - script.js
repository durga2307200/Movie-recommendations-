const API_KEY = "406c6cfefc1d55bf6f22f476fc3fed6d"; // Replace with your TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Function to search for a movie
function searchMovie() {
    const searchInput = document.getElementById("searchInput").value;
    if (searchInput === "") {
        alert("Please enter a movie name.");
        return;
    }

    fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const movie = data.results[0]; // Get the first search result
                displayMovieDetails(movie);
                fetchRecommendations(movie.id);
            } else {
                alert("Movie not found!");
            }
        })
        .catch(error => console.error("Error fetching movie:", error));
}

// Function to display movie details
function displayMovieDetails(movie) {
    const movieDetails = document.getElementById("movieDetails");
    movieDetails.innerHTML = `
        <h2>${movie.title}</h2>
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
        <p>${movie.overview}</p>
    `;
}

// Function to fetch and display recommended movies
function fetchRecommendations(movieId) {
    fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const recommendations = document.getElementById("recommendations");
            recommendations.innerHTML = "";

            if (data.results.length > 0) {
                data.results.slice(0, 6).forEach(movie => { // Show up to 6 recommended movies
                    const movieCard = document.createElement("div");
                    movieCard.classList.add("movie-card");
                    movieCard.innerHTML = `
                        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
                        <p>${movie.title}</p>
                    `;
                    recommendations.appendChild(movieCard);
                });
            } else {
                recommendations.innerHTML = "<p>No recommendations available.</p>";
            }
        })
        .catch(error => console.error("Error fetching recommendations:", error));
}