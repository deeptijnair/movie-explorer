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
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        results.appendChild(movieTitle);
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
