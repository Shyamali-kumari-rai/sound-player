
const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const songs = document.querySelectorAll(".song");

let currentSong = 0;
let isPlaying = false;

// Load song from HTML dataset
function loadSong(index) {
    const song = songs[index];

    audio.src = song.dataset.song;
    cover.src = song.dataset.cover;

    title.textContent = song.querySelector("h3").textContent;
    artist.textContent = song.querySelector("p").textContent;

    songs.forEach(s => s.classList.remove("active"));
    song.classList.add("active");
}

// Play
function playMusic() {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

// Pause
function pauseMusic() {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

// Toggle
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// Next
function nextSong() {
    currentSong++;
    if (currentSong >= songs.length) currentSong = 0;
    loadSong(currentSong);
    playMusic();
}

// Prev
function prevSong() {
    currentSong--;
    if (currentSong < 0) currentSong = songs.length - 1;
    loadSong(currentSong);
    playMusic();
}

// Click events
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Click on playlist songs
songs.forEach((song, index) => {
    song.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        playMusic();
    });
});

// Load first song
loadSong(0);
function updateUI(index) {
    const song = songs[index];

    cover.src = song.dataset.cover;
    title.textContent = song.querySelector("h3").textContent;
    artist.textContent = song.querySelector("p").textContent;

    songs.forEach(s => s.classList.remove("active"));
    song.classList.add("active");
}
function loadSong(index) {
    const song = songs[index];

    audio.src = song.dataset.song;

    updateUI(index);
}
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playMusic();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playMusic();
}
function playMusic() {
    audio.play();
    isPlaying = true;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
}

function pauseMusic() {
    audio.pause();
    isPlaying = false;

    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}
songs.forEach((song, index) => {
    song.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        playMusic();
    });
    function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    if (sec < 10) sec = "0" + sec;

    return `${min}:${sec}`;
}
audio.addEventListener("timeupdate", () => {
    document.getElementById("current").textContent =
        formatTime(audio.currentTime);

    document.getElementById("progress").value =
        (audio.currentTime / audio.duration) * 100;
});
audio.addEventListener("loadedmetadata", () => {
    document.getElementById("duration").textContent =
        formatTime(audio.duration);
});
document.getElementById("progress").addEventListener("input", (e) => {
    audio.currentTime = (e.target.value / 100) * audio.duration;
});
});