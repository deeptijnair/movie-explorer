# Movie Explorer

A simple movie search application built with HTML, CSS, JavaScript, and Node.js. Users can search for movies and view results fetched from The Movie Database (TMDB) API.

## Features

- Search for movies by title

- Display matching movie titles

- Handle empty search input and searches with no results

- Show a loading message while searching

- Handle API errors gracefully

- Use a Node.js backend to keep the TMDB API access token out of frontend code

## Technologies Used

- HTML5

- CSS3

- JavaScript (ES6+)

- Node.js

- TMDB API

- Getting Started

- Prerequisites

- Node.js

A TMDB account and API Read Access Token

## Setup

1. **Clone this repository**

   ```bash
   git clone https://github.com/deeptijnair/movie-explorer.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd movie-explorer
   ```

3. **Create a `.env` file**

   In the project root, create a file named `.env` and add your TMDB token:

   ```text
   TMDB_TOKEN=your_tmdb_read_access_token_here
   ```

4. **Start the backend**

   ```bash
   npm start
   ```

5. **Open the application**

   Open `index.html` in your browser.

   The backend runs at `http://localhost:3000`.

Important: Keep your .env file private. It is excluded from Git through .gitignore.

## What I Learned

- Working with asynchronous JavaScript using async/await

- Fetching and processing data from an external API

- Dynamically displaying API results in the DOM

- Handling loading states, empty input, and errors

- Building a Node.js backend to handle API authentication securely

- Using Git and GitHub to manage project changes

## Future Improvements

- Display movie posters and release dates

- Add pagination for search results

- Create a movie details view

- Improve responsive design and accessibility

- Add automated tests

## API

Movie data is provided by The Movie Database (TMDB).

This product uses the TMDB API but is not endorsed or certified by TMDB.
