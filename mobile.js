// this contains the mobile version js for solarnova

import { playlists, songToArtistMap } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const playlistRows = document.querySelectorAll('.playlist-row');
  const mainContent = document.querySelectorAll('.main-content');
  const sidebar = document.querySelectorAll('.sidebar');
  const musicContainer = document.getElementById('music-container');
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('play');
  const playPlaylistBtn = document.getElementById('playPlaylist');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const progress = document.getElementById('progress');
  const progressContainer = document.getElementById('progress-container');
  const title = document.getElementById('title');
  const cover = document.getElementById('cover');
  const queueList = document.getElementById('queue-list');
  const likeBtn = document.getElementById('like-btn');
  const shuffleBtn = document.getElementById('shuffle-btn');
  const installApp = document.getElementById('installApp');
  const toggleButton = document.getElementById('toggle-btn');
  const queueContainer = document.getElementById('queue-container');
  const nowPlaying = document.getElementById('now-playing');
  const urlParams = new URLSearchParams(window.location.search);

  const playlistId = urlParams.get('id');

  let currentPlaylist = [];
  let queue = [];
  let isLiked = false;

  playlistRows.forEach(row => {
    row.addEventListener('click', () => {
      const playlistName = row.getAttribute('data-playlist');
      currentPlaylist = playlists[playlistName] || [];
      if (currentPlaylist.length > 0) {
        loadSong(0);
        playSong();
      }
    });
  });

  shuffleBtn.addEventListener('click', () => {
    shufflePlaylist();
  });

  let songIndex = 0;

  const playlistIndicator = document.getElementById('playlist-indicator');

  function getArtistForSong(songNamee) {
    return songToArtistMap[songNamee] || 'Unknown Artist';
  }

  function loadSong(index) {
    let selectedSong;

    if (currentPlaylist.length > 0 && index >= 0 && index < currentPlaylist.length) {
      selectedSong = currentPlaylist[index];
      console.log('Loading song:', selectedSong);

      title.innerText = selectedSong.replace(/-/g, " ");
      audio.src = `music/songs/${selectedSong}.mp3`;
      cover.src = `music/images/${selectedSong}.jpeg`;
      songIndex = index;

      updateQueueList();

      isLiked = playlists['liked-songs'].includes(currentPlaylist[songIndex]);
      updateLikeButton();

      updatePlaylistIndicator();

      console.log('Audio source:', audio.src);

      playSong();


      const currentSongFileName = selectedSong;
      const artist = getArtistForSong(currentSongFileName);

      const artistElement = document.getElementById('artist');
      artistElement.innerText = artist || 'Unknown Artist';

      const songName = selectedSong.replace(/-/g, " ");
      document.getElementById('now-playing-cover').src = `music/images/${selectedSong}.jpeg`;
      document.getElementById('now-playing-song').innerText = songName;
      document.getElementById('now-playing-artist').innerText = artist || 'Unknown Artist';

      navigator.mediaSession.metadata = new MediaMetadata({
        title: selectedSong.replace(/-/g, " "),
        artist: artist,
        artwork: [
          {
            src: cover.src,
            sizes: "140x140",
            type: "image/jpeg",
          },
        ],
      });

    } else {
      console.error('Invalid song index or playlist');
    }
  }

  function loadSongs(playlistId) {
    const playlist = playlists[playlistId];

    if (playlist) {
      const playlistName = playlistId.replace(/-/g, " ");

      const playlistLogo = document.getElementById('playlist-logo');
      playlistLogo.src = `music/images/${playlistId}.jpeg`;

      const playlistNameElement = document.getElementById('playlist-name');
      playlistNameElement.textContent = playlistName;

      const songCountElement = document.getElementById('song-count');
      const songCount = playlist.length;
      songCountElement.textContent = `${songCount} ${songCount === 1 ? 'song' : 'songs'}`;

      const songsContainer = document.querySelector('.songs-container');

      // Clear existing content
      songsContainer.innerHTML = '';

      playlist.forEach(songName => {
        const listItem = document.createElement('li');
        const queueSongDesc = document.createElement('div');
        queueSongDesc.classList.add('queue-song-desc');

        const img = document.createElement('img');
        img.src = `music/images/${songName}.jpeg`;
        img.alt = songName;

        const queueSongTitle = document.createElement('div');
        queueSongTitle.classList.add('queue-song-title');

        const span = document.createElement('span');
        span.textContent = songName.replace(/-/g, " ");

        const p = document.createElement('p');
        const artist = getArtistForSong(songName);
        p.textContent = artist || 'Unknown Artist';

        queueSongTitle.appendChild(span);
        queueSongTitle.appendChild(p);

        queueSongDesc.appendChild(img);
        queueSongDesc.appendChild(queueSongTitle);
        listItem.appendChild(queueSongDesc);

        listItem.addEventListener('click', () => {
          const songIndex = playlist.indexOf(songName);
          currentPlaylist = playlist;
          if (currentPlaylist.length > 0 && songIndex >= 0 && songIndex < currentPlaylist.length) {
            loadSong(songIndex);
            playSong(); // Play the song after loading it
          }
        });

        songsContainer.appendChild(listItem);
      });

      // Load the first song in the playlist by default
      if (playlist.length > 0) {
        currentPlaylist = playlist;
        loadSong(0);
      }
    } else {
      console.error('Playlist not found');
    }
  }



  loadSongs(playlistId);


  function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playPlaylistBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    playPlaylistBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    audio.play();
    navigator.mediaSession.playbackState = "playing";
    const currentSong = document.querySelector('.current-song');
    if (currentSong) {
      const visualizer = currentSong.querySelector('.visualizer');
      if (visualizer) {
        visualizer.style.display = 'block'; // Hide the visualizer
      }
    }
  }

  function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    playPlaylistBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playPlaylistBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    audio.pause();
    navigator.mediaSession.playbackState = "paused";
    const currentSong = document.querySelector('.current-song');
    if (currentSong) {
      const visualizer = currentSong.querySelector('.visualizer');
      if (visualizer) {
        visualizer.style.display = 'none'; // Hide the visualizer
      }
    }
  }

  playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });
  playPlaylistBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();

    }
  });

  likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    updateLikeButton();
    updateLikedSongs();
  });

  prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });

  navigator.mediaSession.setActionHandler("previoustrack", () => {
    songIndex = (songIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });

  nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });

  navigator.mediaSession.setActionHandler("nexttrack", () => {
    songIndex = (songIndex + 1) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "smartfoloo-musicplayer",
      artwork: [
        {
          src: cover.src,
          sizes: "300x300",
          type: "image/jpeg",
          src: cover.src,
          sizes: "2000x2000",
          type: "image/jpeg",
        },
      ],
    });
  });
  navigator.mediaSession.setActionHandler("play", () => {
    navigator.mediaSession.playbackState = "playing";
    playSong()
  });
  navigator.mediaSession.setActionHandler("pause", () => {
    navigator.mediaSession.playbackState = "paused";
    pauseSong()
  });
  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }

  function setProgress(e) {
    e.stopPropagation(); // Prevents the default behavior (page reload) on progress bar click

    const width = this.clientWidth;
    const clickX = e.type.includes('touch') ? e.touches[0].clientX - this.getBoundingClientRect().left : e.clientX - this.getBoundingClientRect().left;
    const duration = audio.duration;
    const newTime = (clickX / width) * duration;
    audio.currentTime = newTime;

    const isPaused = audio.paused;
    if (!isPaused) {
      audio.play();
    }
  }

  function DurTime(e) {
    const { duration, currentTime } = e.srcElement;
    let sec;
    let sec_d;

    let min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;

    function get_sec(x) {
      if (Math.floor(x) >= 60) {
        for (let i = 1; i <= 60; i++) {
          if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
            sec = Math.floor(x) - (60 * i);
            sec = sec < 10 ? '0' + sec : sec;
          }
        }
      } else {
        sec = Math.floor(x);
        sec = sec < 10 ? '0' + sec : sec;
      }
    }

    get_sec(currentTime, sec);

    let min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;

    function get_sec_d(x) {
      if (Math.floor(x) >= 60) {
        for (let i = 1; i <= 60; i++) {
          if (Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
            sec_d = Math.floor(x) - (60 * i);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
          }
        }
      } else {
        sec_d = (isNaN(duration) === true) ? '0' : Math.floor(x);
        sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
      }
    }

    get_sec_d(duration);
  }

  function updateQueueList() {
    queueList.innerHTML = '';

    for (let i = 0; i < currentPlaylist.length; i++) {
      if (i >= songIndex) { // Check if the song is yet to be played or currently playing
        const listItem = document.createElement('li');

        const queueSongDesc = document.createElement('div');
        queueSongDesc.classList.add('queue-song-desc');

        const img = document.createElement('img');
        img.src = `music/images/${currentPlaylist[i]}.jpeg`;
        img.alt = currentPlaylist[i];

        queueSongDesc.appendChild(img);

        const titleSpan = document.createElement('span');
        titleSpan.innerText = currentPlaylist[i].replace(/-/g, " ");

        queueSongDesc.appendChild(titleSpan);
        listItem.appendChild(queueSongDesc);

        if (i === songIndex) {
          listItem.classList.add('current-song');

          const visualizerDiv = document.createElement('div');
          visualizerDiv.classList.add('visualizer');
          for (let j = 0; j < 4; j++) {
            const barDiv = document.createElement('div');
            barDiv.classList.add('bar');
            visualizerDiv.appendChild(barDiv);
          }
          listItem.appendChild(visualizerDiv);
        }

        queueList.appendChild(listItem);
      }
    }
  }



  function updateLikeButton() {
    if (isLiked) {
      likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
      likeBtn.innerHTML = '<i class="far fa-heart"></i>';
    }
  }

  function updateLikedSongs() {
    if (isLiked) {
      playlists['liked-songs'].push(currentPlaylist[songIndex]);
    } else {
      const index = playlists['liked-songs'].indexOf(currentPlaylist[songIndex]);
      if (index !== -1) {
        playlists['liked-songs'].splice(index, 1);
      }
    }
    localStorage.setItem('liked-songs', playlists['liked-songs']);
  }

  function updatePlaylistIndicator() {
    const playlistName = getPlaylistNameBySong(currentPlaylist[songIndex]);
    playlistIndicator.innerText = `Playing from: ${playlistName.replace(/-/g, " ")}`;
  }

  function getPlaylistNameBySong(song) {
    for (const [playlistName, songs] of Object.entries(playlists)) {
      if (songs.includes(song)) {
        return playlistName;
      }
    }
    return 'Unknown Playlist';
  }

  function shufflePlaylist() {
    for (let i = currentPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentPlaylist[i], currentPlaylist[j]] = [currentPlaylist[j], currentPlaylist[i]];
    }
    loadSong(0);
    playSong();
  }

  audio.addEventListener('timeupdate', updateProgress);
  progressContainer.addEventListener('click', setProgress);

  audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
  });

  toggleButton.addEventListener('click', () => {
    if (queueContainer.style.display === 'block') {
      queueContainer.style.display = 'none';
      nowPlaying.style.display = 'block';
    } else {
      queueContainer.style.display = 'block';
      nowPlaying.style.display = 'none';
    }
  });

});

if (!/iPhone|iPod|Android/i.test(navigator.userAgent)) {
  window.location.href = '/index.html';
}

if (window.self !== window.top) {
  if (window.location !== 'http://127.0.0.1:3000/') {
    window.location.href = 'https://boulderbugle.com/article-art-class-e63TTX8G';
  }
}