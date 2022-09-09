const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

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

// Previous Song
function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()
}

// Next Song
function nextSong() {
    songIndex++
    if(songIndex > songs.length -1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// On Load Select first Song
loadSong(songs[songIndex]);

//Update ProgressBar and time
function updateProgressBar(e) {
    if(isPlaying) {
        const { duration, currentTime } = e.srcElement;
        console.log(duration, currentTime)

        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
    }
}

// Events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)