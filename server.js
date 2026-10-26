
const http = require('node:http');

const server = http.createServer(async (req, res) => {
  // Allow requests from our frontend
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Handle movie search requests
  if (req.method === 'GET' && req.url.startsWith('/api/movies')) {
    const url = new URL(req.url, 'http://localhost:3000');
    const movieName = url.searchParams.get('query');

    if (!movieName || !movieName.trim()) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Movie title is required' }));
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`TMDB request failed: ${response.status}`);
      }

      const data = await response.json();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unable to fetch movies' }));
    }

    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3000, () => {
  console.log('Movie Explorer backend running at http://localhost:3000');
});
