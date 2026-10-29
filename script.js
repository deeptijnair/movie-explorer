const searchButton = document.getElementById('mybutton');
const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');

searchButton.addEventListener('click', async () => {
  if (searchInput.value.trim() === '') {
    results.textContent = 'Please enter a movie title!';
    return;
  }
  const movieName = searchInput.value;
  const url = `http://localhost:3000/api/movies?query=${encodeURIComponent(movieName)}`;

  results.textContent = 'Searching for movies...';
  searchButton.disabled = true;

  console.log('Request URL:', url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log('Error thrown due to response not being OK', response.status);
      throw new Error('Response is not OK');
    }
    const data = await response.json();
    if (data.results.length > 0) {
      results.replaceChildren();
      data.results.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm hover:border-slate-600 transition-colors';
        let moviePoster;
        if (movie.poster_path) {
          moviePoster = document.createElement('img');
          moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        } else {
          moviePoster = document.createElement('div');
          moviePoster.textContent = 'Poster unavailable';
          moviePoster.classList.add(
            'flex',
            'items-center',
            'justify-center',
            'bg-slate-800',
            'text-slate-400',
            'text-sm',
            'text-center',
          );
        }
        moviePoster.classList.add('w-full', 'aspect-[2/3]', 'object-cover', 'rounded-lg');
        movieCard.appendChild(moviePoster);
        const movieTitle = document.createElement('h3');
        movieTitle.className = 'text-lg font-semibold text-slate-100';
        movieTitle.textContent = movie.title;
        movieCard.appendChild(movieTitle);
        const releaseYear = document.createElement('p');
        if (movie.release_date) {
          releaseYear.textContent = movie.release_date.split('-')[0];
        } else {
          releaseYear.textContent = 'Release year unavailable';
        }
        releaseYear.className = 'mt-2 text-sm text-slate-400';
        movieCard.appendChild(releaseYear);
        results.appendChild(movieCard);
      });
    } else {
      results.textContent = 'No movies found. Try another title.';
    }
  } catch (error) {
    results.textContent = 'Something went wrong. Please try again.';
    console.log('error', error);
  } finally {
    searchButton.disabled = false;
  }
});
