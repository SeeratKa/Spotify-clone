
// Initialize variables
let songIndex = 0;
let AudioElement = new Audio("AlbumSongs/1.mp3"); // Initialize with the first song
let MasterPlay = document.getElementById("MasterPlay");
let MyProgressBar = document.getElementById("MyProgressBar");
let gif = document.getElementById("gif");
let MasterSongName = document.getElementById("MasterSongName");

// Array of song items
let songItem = Array.from(document.getElementsByClassName("songItem"));
let SongItemPlay = Array.from(document.getElementsByClassName("SongItemPlay"));

// Array of songs with their details
let AlbumSongs = [
  { SongName: "Taylor Swift-Karma", filepath: "AlbumSongs/1.mp3", coverpath: "AlbumCover/1.jpg" },
  { SongName: "Taylor Swift-Beautiful eyes", filepath: "AlbumSongs/2.mp3", coverpath: "AlbumCover/2.jpg" },
  { SongName: "Rema - Calm Down", filepath: "AlbumSongs/3.mp3", coverpath: "AlbumCover/3.webp" },
  { SongName: "DJ Snake-Taki Taki", filepath: "AlbumSongs/4.mp3", coverpath: "AlbumCover/4.jpg" },
  { SongName: "Janji - Heroes Tonight", filepath: "AlbumSongs/5.mp3", coverpath: "AlbumCover/5.jpg" },
  { SongName: "let me love you", filepath: "AlbumSongs/6.mp3", coverpath: "AlbumCover/6.jpg" }
];

// Update song items with cover images and names
songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = AlbumSongs[i].coverpath;
  element.getElementsByClassName("SongName")[0].innerText = AlbumSongs[i].SongName;
});

// Function to make all play buttons to play icon
const MakeAllPlays = () => {
  SongItemPlay.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};



// Play/Pause button click event
MasterPlay.addEventListener("click", () => {
  if (AudioElement.paused || AudioElement.currentTime <= 0) {
    AudioElement.play();
    MasterPlay.classList.remove("fa-circle-play");
    MasterPlay.classList.add("fa-circle-pause");
    // Show play button on corresponding SongItemPlay
    SongItemPlay[songIndex].classList.remove("fa-circle-play");
    SongItemPlay[songIndex].classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    AudioElement.pause();
    MasterPlay.classList.add("fa-circle-play");
    MasterPlay.classList.remove("fa-circle-pause");
    MakeAllPlays();
    gif.style.opacity = 0;
  }
});

// Time update event for progress bar
AudioElement.addEventListener("timeupdate", () => {
  let progress = (AudioElement.currentTime / AudioElement.duration) * 100;
  MyProgressBar.value = progress;
});

// Progress bar change event
MyProgressBar.addEventListener("change", () => {
  AudioElement.currentTime = (MyProgressBar.value * AudioElement.duration) / 100;
});

let previousSongIndex = null; // Initialize previousSongIndex variable
// Function to add pause button to the previousSongIndex
const addPauseButtonToPrevious = () => {
  if (previousSongIndex !== null) {
      const previousSongItemPlay = document.getElementById(previousSongIndex.toString());
      if (previousSongItemPlay) {
          previousSongItemPlay.classList.add("fa-circle-play");
          previousSongItemPlay.classList.remove("fa-circle-pause");
      }
  }
};



// Play/Pause button click event for each song item
SongItemPlay.forEach((element) => {
  element.addEventListener("click", (e) => {
   
    let clickedIndex = parseInt(e.target.id);
    
    if (songIndex === clickedIndex && !AudioElement.paused) {
      AudioElement.pause();
      MasterPlay.classList.add("fa-circle-play");
      MasterPlay.classList.remove("fa-circle-pause");
      MakeAllPlays();
      gif.style.opacity = 0;
    } else {
      
        // Get the previous songIndex before updating it
        previousSongIndex = songIndex;
      songIndex = clickedIndex;
     addPauseButtonToPrevious();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      AudioElement.src = AlbumSongs[songIndex].filepath;
      MasterSongName.innerText = AlbumSongs[songIndex].SongName;
      AudioElement.currentTime = 0;
      AudioElement.play();
      MasterPlay.classList.add("fa-circle-pause");
      MasterPlay.classList.remove("fa-circle-play");
      gif.style.opacity = 1;
      
    }
  });
});




// Next button click event
document.getElementById("next").addEventListener("click", () => {
  previousSongIndex = songIndex;
  songIndex = (songIndex + 1) % AlbumSongs.length;
  AudioElement.src = AlbumSongs[songIndex].filepath;
  MasterSongName.innerText = AlbumSongs[songIndex].SongName;
  AudioElement.currentTime = 0;
  AudioElement.play();
  gif.style.opacity = 1;
  MasterPlay.classList.add("fa-circle-pause");
  MasterPlay.classList.remove("fa-circle-play");
  addPauseButtonToPrevious();
  SongItemPlay[songIndex].classList.remove("fa-circle-play");
  SongItemPlay[songIndex].classList.add("fa-circle-pause");
});

// Previous button click event
document.getElementById("previous").addEventListener("click", () => {
  previousSongIndex = songIndex;
  songIndex = (songIndex - 1 + AlbumSongs.length) % AlbumSongs.length;
  AudioElement.src = AlbumSongs[songIndex].filepath;
  MasterSongName.innerText = AlbumSongs[songIndex].SongName;
  AudioElement.currentTime = 0;
  AudioElement.play();
  gif.style.opacity = 1;
  MasterPlay.classList.add("fa-circle-pause");
  MasterPlay.classList.remove("fa-circle-play");
  addPauseButtonToPrevious();
  SongItemPlay[songIndex].classList.remove("fa-circle-play");
  SongItemPlay[songIndex].classList.add("fa-circle-pause");
});
