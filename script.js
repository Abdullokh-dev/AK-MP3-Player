const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
let audioSpeed = document.getElementById('speed')
//Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Voodoo',
        artist: 'Badshah, J Balvin & Tainy'
    },
    {
        name: 'jacinto-2',
        displayName: 'VOODOO',
        artist: 'WILLY WILLIAM'
    },
    {
        name: 'jacinto-3',
        displayName: 'Завязывай',
        artist: 'GUNWEST'
    },
]

let isPlaying = false

function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Current song
let songIndex = 0

// Change Speed
function changeSpeed() {
    switch (music.playbackRate) {
        case 2:
            music.playbackRate = 0.5
            audioSpeed.innerText = `${music.playbackRate}x`
            return
    }
    music.playbackRate += 0.25
    audioSpeed.innerText = `${music.playbackRate}x`
}

// Previous Song
function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    audioSpeed.innerText = `${music.playbackRate}x`
    playSong()
}

// Next Song
function nextSong() {
    songIndex++
    if(songIndex > songs.length -1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    audioSpeed.innerText = `${music.playbackRate}x`
    playSong()
}

// On Load Select first Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)
audioSpeed.addEventListener('click', changeSpeed)