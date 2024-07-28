const apiKey = '8ccf55c5345ce65968b95b8f3466d4a5'; // Replace with your TMDb API key
const movieId = '801688'; // Replace with the TMDb movie ID
const defaultProfileImage = 'https://i.postimg.cc/QNpB22z7/1000008089-modified.png'; // Path to the default profile image

async function getMovieDetails() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
        const movie = await response.json();

        // Set movie title
        document.querySelector('.movie-title').textContent = movie.title;

        // Set CBFC info
        document.querySelector('.cbfc-info-container').innerHTML = `
            <div class="cbfc-box">CBFC: U/A</div>
            <div class="cbfc-info">2024 ‧ ${movie.genres.map(genre => genre.name).join('/')}</div>
        `;

        // Set user score
        const userScore = movie.vote_average * 10; // Convert to percentage
        updateUserScore(userScore);

        // Set movie summary
        document.querySelector('.movie-summary').textContent = movie.overview;

        // Fetch and set cast information
        const castResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`);
        const cast = await castResponse.json();

        // Set cast information
        const castList = cast.cast.map(actor => `
            <div class="cast-member">
                <img src="${actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : defaultProfileImage}" alt="${actor.name}">
                <p>${actor.name}</p>
                <p>${actor.character}</p>
            </div>
        `).join('');
        document.querySelector('#movie-cast').innerHTML = castList;
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

function updateUserScore(score) {
    // Implementation of user score update
    // You can update the DOM element to show the score if you have one
    console.log(`User Score: ${score}%`);
}

getMovieDetails();
