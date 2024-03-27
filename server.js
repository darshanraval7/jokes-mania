
// [ Required NPMs ]
const express = require('express');
const axios = require('axios');

// [ Setup App Object & Server Port ]
const app = express();
const PORT = process.env.PORT || 3000;

// [ API For Jokes ]
const API_URL_RANDOM_JOKES = 'https://official-joke-api.appspot.com/random_joke';
const API_URL_RANDOM_TEN_JOKES = 'https://official-joke-api.appspot.com/random_ten';

// [ Serve the frontend files (assuming your frontend files are in a 'public' directory) ]
app.use(express.static('public'));

// [ Random ]
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/hehe.html');
});

app.get('/jokesMania', (req, res) => {
    res.sendFile(__dirname + '/public/jokesMania.html');
});

// [ Define a route to fetch data from the third-party API ]
app.get('/api/jokes', async (req, res) => {
  try {
    const response = await axios.get(API_URL_RANDOM_JOKES);
    const jokes = response.data;
    const thenos = ( jokes ) ? true : false;
    const respObject = { thenos };
    if (thenos === false) {
        res.json(respObject);
    }
    else {
        respObject['setup'] = jokes.setup
        respObject['punchLine'] = jokes.punchLine
        res.json(respObject);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get('/api/tenJokes', async (req, res) => {
  try {
    const response = await axios.get(API_URL_RANDOM_TEN_JOKES);
    const jokes = response.data;
    const jokesArray = [];
    for (let index = 0; index < jokes.length; index++) {
      jokesArray.push({
        'setup': jokes[index].setup,
        'punchLine': jokes[index].punchline
      })
    }
    res.json(jokesArray);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// [ Start the server ]
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
