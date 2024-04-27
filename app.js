import { playlists, songToArtistMap } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
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
  const toggleButton = document.getElementById('toggle-btn');
  const queueContainer = document.getElementById('queue-container');
  const nowPlaying = document.getElementById('now-playing');
  const urlParams = new URLSearchParams(window.location.search);

  const playlistId = urlParams.get('id');

  let currentPlaylist = [];
  let queue = [];
  let likeCheck = false;

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

    if (!localStorage.getItem('likedSongs')) {
      localStorage.setItem('likedSongs', '[]');
    }

    if (currentPlaylist.length > 0 && index >= 0 && index < currentPlaylist.length) {
      selectedSong = currentPlaylist[index];
      console.log('Loading song:', selectedSong);

      title.innerText = selectedSong.replace(/-/g, " ");
      audio.src = `music/songs/${selectedSong}.mp3`;
      cover.src = `music/images/${selectedSong}.jpeg`;
      songIndex = index;

      updateQueueList();

      setLikeButton();

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

    if (playlistId === "liked-songs") {
      const likedSongsList = JSON.parse(localStorage.getItem('likedSongs'));
      const likedSongsPlaylist = likedSongsList || [];
      const playlistName = "Liked Songs";

      const playlistLogo = document.getElementById('playlist-logo');
      playlistLogo.src = 'music/images/liked.png';

      const playlistNameElement = document.getElementById('playlist-name');
      playlistNameElement.textContent = playlistName;

      const songCountElement = document.getElementById('song-count');
      const songCount = likedSongsPlaylist.length;
      songCountElement.textContent = `${songCount} ${songCount === 1 ? 'song' : 'songs'}`;

      const songsContainer = document.querySelector('.songs-container');

      songsContainer.innerHTML = '';

      likedSongsPlaylist.forEach(songName => {
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
          const songIndex = likedSongsPlaylist.indexOf(songName);
          currentPlaylist = likedSongsPlaylist;
          if (currentPlaylist.length > 0 && songIndex >= 0 && songIndex < currentPlaylist.length) {
            loadSong(songIndex);
            playSong();
          }
        });

        songsContainer.appendChild(listItem);
      });

      if (likedSongsPlaylist.length > 0) {
        currentPlaylist = likedSongsPlaylist;
        console.log(currentPlaylist);
        loadSong(0);
      }
    }

    else if (playlist) {
      const words = playlistId.split("-");
      const capitalize = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      const playlistName = capitalize.join(" ");

      const playlistLogo = document.getElementById('playlist-logo');
      playlistLogo.src = `music/images/${playlistId}.jpeg`;

      const playlistNameElement = document.getElementById('playlist-name');
      playlistNameElement.textContent = playlistName;

      const songCountElement = document.getElementById('song-count');
      const songCount = playlist.length;
      songCountElement.textContent = `${songCount} ${songCount === 1 ? 'song' : 'songs'}`;

      const songsContainer = document.querySelector('.songs-container');

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
            playSong();
          }
        });

        songsContainer.appendChild(listItem);
      });

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
        visualizer.style.display = 'block';
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
        visualizer.style.display = 'none';
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
    likeCheck = !likeCheck;
    updateLikeButton();
    updateLikedSongs();
  });

  prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadSong(songIndex);
    playSong();
    navigator.mediaSession.metadata = new MediaMetadata({
      title: selectedSong.replace(/-/g, " "),
      artist: "solarnova",
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
      artist: "solarnova",
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
      artist: "solarnova",
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
      artist: "solarnova",
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
    e.stopPropagation();

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
      if (i >= songIndex) {
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

  function setLikeButton() {
    if (JSON.parse(localStorage.getItem('likedSongs')).includes(currentPlaylist[songIndex])) {
      likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      likeBtn.style.color = '#ff0000';
    } else {
      likeBtn.innerHTML = '<i class="far fa-heart"></i>';
      likeBtn.style.color = '#cad3f5';
    }
  }

  function updateLikeButton() {
    if (JSON.parse(localStorage.getItem('likedSongs')).includes(currentPlaylist[songIndex])) {
      likeBtn.innerHTML = '<i class="far fa-heart"></i>';
      likeBtn.style.color = '#cad3f5';
      if (playlistId === 'liked-songs') {
        window.location.reload();
      }
    } else {
      likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      likeBtn.style.color = '#ff0000';
    }
  }

  function updateLikedSongs() {
    let likedSongs = JSON.parse(localStorage.getItem('likedSongs'));

    if (!likedSongs) {
      likedSongs = [];
    }

    const song = currentPlaylist[songIndex];
    const songExists = likedSongs.includes(song);

    if (songExists) {
      const indexOfSong = likedSongs.indexOf(song);
      likedSongs.splice(indexOfSong, 1);
    } else {
      likedSongs.push(song);
    }

    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
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

var tab = localStorage.getItem("tab");

if (tab) {
  try {
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}

if (tabData.title) {
  document.getElementById("title").value = tabData.title;
}
if (tabData.icon) {
  document.getElementById("icon").value = tabData.icon;
}

var settingsDefaultTab = {
  title: "solarnova",
  icon: "/favicon.png",
};

function setTitle(title = "") {
  if (title) {
    document.title = title;
  } else {
    document.title = settingsDefaultTab.title;
  }

  var tab = localStorage.getItem("tab");

  if (tab) {
    try {
      var tabData = JSON.parse(tab);
    } catch {
      var tabData = {};
    }
  } else {
    var tabData = {};
  }

  if (title) {
    tabData.title = title;
  } else {
    delete tabData.title;
  }

  localStorage.setItem("tab", JSON.stringify(tabData));
}

function setFavicon(icon) {
  if (icon) {
    document.querySelector("link[rel='icon']").href = icon;
  } else {
    document.querySelector("link[rel='icon']").href = settingsDefaultTab.icon;
  }

  var tab = localStorage.getItem("tab");

  if (tab) {
    try {
      var tabData = JSON.parse(tab);
    } catch {
      var tabData = {};
    }
  } else {
    var tabData = {};
  }

  if (icon) {
    tabData.icon = icon;
  } else {
    delete tabData.icon;
  }

  localStorage.setItem("tab", JSON.stringify(tabData));
}

var tab = localStorage.getItem('tab');
if (tab) {
  try {
    var tabData = JSON.parse(tab);
  } catch {
    var tabData = {};
  }
} else {
  var tabData = {};
}

if (tabData.title) {
  document.title = tabData.title;
}

if (tabData.icon) {
  document.querySelector('link[rel="icon"]').href = tabData.icon;
}

if (window.self !== window.top) {
  if (window.location !== 'http://127.0.0.1:3000/') {
    window.location.href = 'https://boulderbugle.com/article-art-class-e63TTX8G';
  }
}

const currentHour = new Date().getHours();

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

const greetingElement = document.getElementById("greeting");
const greeting = getGreeting(currentHour);
greetingElement.textContent = greeting

const gameList = document.getElementById("playlists");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  const gameCards = gameList.querySelectorAll(".playlist-card");

  gameCards.forEach((card) => {
    const title = card.querySelector(".title").textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  gameList.style.removeProperty("display");
  gameList.style.removeProperty("flex-wrap");

  const visibleCards = Array.from(gameList.querySelectorAll(".playlist-card[style='display: block;']"));

  if (visibleCards.length > 0) {
    gameList.style.display = "flex";
    gameList.style.flexWrap = "wrap";
  } else {
    gameList.style.display = "grid";
    gameList.style.gridTemplateColumns = "repeat(auto-fit, 150px)";
  }
});
