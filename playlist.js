const playlistData = [
  {
    name: 'Liked Songs',
    image: 'liked.png',
    songs: [
      { name: 'Song 1', artist: 'Artist 1' },
      { name: 'Song 2', artist: 'Artist 2' }
      // Add more songs as needed
    ]
  },
  {
    name: 'phonk',
    image: 'music/images/yoasobi.png',
    songs: [
      { name: 'metamorphosis', artist: 'INTERWORLD'}
    ]
  },
  // Add more playlists
];

const musicDirectory = 'music/songs/';

// Function to populate playlist
const populatePlaylist = (playlistData) => {
  const playlistContainer = document.getElementById('playlist');

  playlistData.forEach((playlist) => {
    const playlistWrapper = document.createElement('div');
    playlistWrapper.classList.add('playlist');

    const playlistTitle = document.createElement('h2');
    playlistTitle.textContent = playlist.name;
    playlistWrapper.appendChild(playlistTitle);

    const playlistImage = document.createElement('img');
    playlistImage.src = playlist.image;
    playlistImage.alt = playlist.name;
    playlistWrapper.appendChild(playlistImage);

    const songsContainer = document.createElement('div');
    songsContainer.classList.add('songs');

    playlist.songs.forEach((song, index) => {
      const songItem = document.createElement('div');
      songItem.classList.add('song');
      songItem.innerHTML = `
        <img src="music/images/${song.name}.jpeg" alt="${song.name}" class="song-cover">
        <div class="song-details">
          <h3 class="song-title">${song.name}</h3>
          <p class="song-artist">${song.artist}</p>
        </div>
        <button class="play-btn" onclick="playSong('${song.name}')">Play</button>
      `;
      songsContainer.appendChild(songItem);
    });

    playlistWrapper.appendChild(songsContainer);
    playlistContainer.appendChild(playlistWrapper);
  });
};

// Simulating playSong function
function playSong(songName) {
  const selectedSong = playlistData.flatMap(playlist => playlist.songs).find(song => song.name === songName);

  if (selectedSong) {
    const audio = new Audio(`${musicDirectory}${selectedSong.name}.mp3`);
    audio.play();
    // Perform other actions with selectedSong as needed
    console.log('Playing:', selectedSong.name);
  }
}

// Populate the playlist on page load
window.onload = function () {
  populatePlaylist(playlistData);
};
