var currentMusic = 0;

var music = document.getElementById('song');

let progress = document.getElementById('progress');
let title = document.getElementById('title');
let artist = document.getElementById('artist');
let thumbnail = document.getElementById('thumbnail');
const currentTime = document.querySelector('.currentTime');
const musicDuration = document.querySelector('.musicDuration');
let togglePlay = document.getElementById('togglePlay');
const forward = document.querySelector('#forward');
const backward = document.querySelector('#backward');
const shuffler = document.querySelector('.shuffle');

//console.log(currentMusic, music, progress, title, artist, thumbnail, currentTime, musicDuration, togglePlay, forward, backward)

togglePlay.addEventListener('click', () => {
    if(togglePlay.classList.contains('bi-pause-circle-fill')){
        song.pause();
        togglePlay.classList.remove('bi-pause-circle-fill');
        togglePlay.classList.add('bi-play-circle-fill');
    }else{
        song.play();
        togglePlay.classList.remove('bi-play-circle-fill');
        togglePlay.classList.add('bi-pause-circle-fill');
    }
})
if(song.play()){
    setInterval(()=>{
        progress.value = song.currentTime;
        currentTime.innerHTML = formatTime(song.currentTime);
        if (Math.floor(music.currentTime) == Math.floor(progress.max)){
            forward.click();
        }
    },1)
}

const setMusic = (i) => {
    progress.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    title.innerHTML = song.name;
    artist.innerHTML = song.artist;
    thumbnail.src = song.cover;

    currentTime.innerHTML = '0:00'
    setTimeout(() => {
        progress.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300)
}

setMusic(0);

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10){
        min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10){
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

progress.addEventListener('change', () => {
    music.currentTime = progress.value;
})

forward.addEventListener('click', () => {
    if(currentMusic >= songs.length - 1){
        currentMusic = 0;
        music.pause();
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

backward.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length - 1;
        music.pause();
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    pauseMusic();
})

const playMusic = () => {
    music.play();
    togglePlay.classList.remove('bi-play-circle-fill');
    togglePlay.classList.add('bi-pause-circle-fill');
}

const stopMusic = () => {
    music.pause();
    togglePlay.classList.remove('bi-pause-circle-fill');
    togglePlay.classList.add('bi-play-circle-fill');
}

// Bottom Media
    // Volume Slider
    music.volume = 0.5;
    const volumeSlider = document.getElementById('audio-control')
    const volumeIcon = document.getElementById('volume');
    volumeSlider.addEventListener("input", () => {
        music.volume = volumeSlider.value;
      });
    if (music.volume >= 0.8) {
        volumeIcon.classList.remove('bx bx-volume');
        volumeIcon.classList.add('bx bxs-volume-full')
        console.log(volumeIcon.classList);
    }
    

// Shuffle



// Arrows-Playlist
const rightArrow = document.querySelector('.bi-arrow-right-short');
const leftArrow = document.querySelector('.bi-arrow-left-short');
const listTab = document.querySelector('.items');
const leftArrowContainer = document.querySelector('.left-arrow');
const rightArrowContainer = document.querySelector('.right-arrow');

const manageIcons = () => {
    if (listTab.scrollLeft >= 0) {
        leftArrowContainer.classList.add('active');
        console.log(leftArrowContainer)
    } else {
        leftArrowContainer.classList.remove('active');
        console.log(leftArrowContainer)
    }

    let maxScrollValue = listTab.scrollWidth - listTab.clientWidth - 4;
    console.log(listTab.scrollWidth, listTab.clientWidth);

    if (listTab.scrollLeft >= maxScrollValue) {
        rightArrowContainer.classList.remove('active');
    } else {
        rightArrowContainer.classList.add('active');
    }

    if (listTab.scrollLeft == 0) {
        leftArrowContainer.classList.remove('active');
    };
};

rightArrow.addEventListener('click', () => {
    listTab.scrollLeft += 200;
    manageIcons();
});

leftArrow.addEventListener('click', () => {
    listTab.scrollLeft -= 200;
    manageIcons();
});
listTab.addEventListener('scroll', () => {
    manageIcons();
})

//Now Playing//

const nowPlaying = document.querySelector('#now-playing');
const nowPlayingContainer = document.querySelector('.now-playing-container')
const nowPlayingArrow = document.querySelector('.now-playing-arrow');
const mainContainer = document.querySelector('#main-container');
const mainHeader = document.querySelector('#main-header');
const musicTitle = document.querySelector('#now-playing-song-title');
const musicArtist = document.querySelector('#now-playing-song-artist');
const musicThumbnail = document.querySelector('#now-playing-song-thumbnail');
const credits = document.querySelector('#credits');
nowPlayingArrow.addEventListener('click', () => {
    nowPlayingContainer.classList.toggle('active')
    nowPlayingArrow.classList.toggle('active');
    nowPlaying.classList.toggle('active');
    mainContainer.classList.toggle('active');
    setNowPlaying(currentMusic);
});


const setNowPlaying = (i) => {
    let song = songs[i];
    currentMusic = i;
    musicTitle.innerHTML = song.name;
    musicArtist.innerHTML = song.artist;
    musicThumbnail.src = song.cover;
    credits.innerHTML = song.artist;
}

