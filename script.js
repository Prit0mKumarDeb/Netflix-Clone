console.log('Welcome to spotify');
let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));


let songs = [
    {songname: "Set Fire To the Rain - Adele", filepath: "songs/rain.mp3", coverpath: "covers/cov1.jpg.jpg"},
    {songname: "bbno$,_y2k_-_lalala_(Lyrics)(128kbps)", filepath: "songs/lalala.mp3", coverpath: "covers/cov2.png.png"},
    {songname: "Play_Date_(Official_Audio)(128kbps)", filepath: "songs/playdate", coverpath: "covers/cov4.jpg.jpg"},
    {songname: "Queen_-_We_Will_Rock_You_(128kbps)", filepath: "songs/we will.mp3", coverpath: "covers/cov5.jpg.jpg"},
    {songname: "Somethings_never_change(128kbps)", filepath: "songs/never change.mp3", coverpath: "covers/cov6.jpg"},
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})

// audioElement.play();

//handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100)
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songindex+1}.mp3`;
        masterSongName.innerText = songs[songindex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>3){
        songindex = 0
    }
    else{
        songindex += 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<1){
        songindex = 5
    }
    else{
        songindex -= 1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})