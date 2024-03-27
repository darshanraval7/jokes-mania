document.addEventListener('DOMContentLoaded', function() {
    const jokesContainer = document.querySelector('.jokes-container');
    
    // Sample jokes data
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "Parallel lines have so much in common. It's a shame they'll never meet.",
        // Add more jokes here
    ];

    fetch('/api/jokes')
        .then(response => response.json())
        .then(jokes => {
            const jokesContainer = document.getElementById('jokes');
            jokes.forEach(joke => {
            const jokeElement = document.createElement('p');
            jokeElement.textContent = joke.text;
            jokesContainer.appendChild(jokeElement);
            });
        })
        .catch(error => console.error('Error fetching jokes:', error));

    // Function to create and add jokes to the container
    function addJokesToContainer(jokesArray) {
        jokesArray.forEach(joke => {
            const jokeElement = document.createElement('div');
            jokeElement.classList.add('joke');
            const jokeText = document.createElement('p');
            jokeText.textContent = joke;
            jokeElement.appendChild(jokeText);
            jokesContainer.appendChild(jokeElement);
        });
    }

    // Add jokes to the container
    addJokesToContainer(jokes);
});
