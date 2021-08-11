const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Jokes to VoiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '8e894284f61d410f8d2fec79db6506d0',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API
async function getJokes() {
    // Disable Button
    toggleButton();

    // Get API
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
    
        // Text to Speech
        tellMe(joke);

    } catch (error) {
        //Catch Errors Here
        console.log('my bad', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);