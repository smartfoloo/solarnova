document.addEventListener('DOMContentLoaded', () => {
	const playlistCards = document.querySelectorAll('.playlist-card');
	const musicContainer = document.getElementById('music-container');
	const audio = document.getElementById('audio');
	const playBtn = document.getElementById('play');
	const prevBtn = document.getElementById('prev');
	const nextBtn = document.getElementById('next');
	const progress = document.getElementById('progress');
	const progressContainer = document.getElementById('progress-container');
	const title = document.getElementById('title');
	const cover = document.getElementById('cover');
	const currTime = document.querySelector('#currTime');
	const durTime = document.querySelector('#durTime');
	const queueContainer = document.getElementById('queue-container');
	const queueList = document.getElementById('queue-list');
	const likeBtn = document.getElementById('like-btn');
	const shuffleBtn = document.getElementById('shuffle-btn'); // Add this line

	let playlists = {
		'liked-songs': [],
		'yoasobi': ['怪物', 'ハルジオン', 'ハルカ', '夜に駆ける', 'あの夢をなぞって', '三原色', '祝福', 'セブンティーン'],
		'phonk': ['metamorphosis', 'close-eyes', 'lovely-bastards', 'memory-reboot', 'rave', 'shadow', 'psycho-cruise'],
		'gaming': ['my-ordinary-life'],
		'meme-songs': ['whopper', 'nom-nom-nom-nom-nom-nom-nom', 'peppa-pig', 'loud-indian-music', 'soviet-anthem']
	};

	let currentPlaylist = [];
	let queue = [];
	let isLiked = false;

	playlistCards.forEach(card => {
		card.addEventListener('click', () => {
			const playlistName = card.getAttribute('data-playlist');
			currentPlaylist = playlists[playlistName] || [];
			if (currentPlaylist.length > 0) {
				loadSong(0);
				playSong();
			}
		});
	});

	// Add the shuffle functionality
	shuffleBtn.addEventListener('click', () => {
		shufflePlaylist();
	});

	let songIndex = 0;

	const playlistIndicator = document.getElementById('playlist-indicator');

	function loadSong(index) {
		title.innerText = currentPlaylist[index];
		audio.src = `music/${currentPlaylist[index]}.mp3`;
		cover.src = `images/${currentPlaylist[index]}.jpeg`;
		songIndex = index;

		// Update the queue list
		updateQueueList();

		// Update like button state
		isLiked = playlists['liked-songs'].includes(currentPlaylist[songIndex]);
		updateLikeButton();

		// Update playlist indicator
		updatePlaylistIndicator();
	}

	function playSong() {
		musicContainer.classList.add('play');
		playBtn.querySelector('i.fas').classList.remove('fa-play');
		playBtn.querySelector('i.fas').classList.add('fa-pause');
		audio.play();
	}

	function pauseSong() {
		musicContainer.classList.remove('play');
		playBtn.querySelector('i.fas').classList.add('fa-play');
		playBtn.querySelector('i.fas').classList.remove('fa-pause');
		audio.pause();
	}

	playBtn.addEventListener('click', () => {
		const isPlaying = musicContainer.classList.contains('play');
		if (isPlaying) {
			pauseSong();
		} else {
			playSong();
		}
	});

	likeBtn.addEventListener('click', () => {
		isLiked = !isLiked; // Toggle like state
		updateLikeButton();
		updateLikedSongs(); // Update liked songs playlist
	});

	prevBtn.addEventListener('click', () => {
		songIndex = (songIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
		loadSong(songIndex);
		playSong();
	});

	nextBtn.addEventListener('click', () => {
		songIndex = (songIndex + 1) % currentPlaylist.length;
		loadSong(songIndex);
		playSong();
	});

	function updateProgress(e) {
		const { duration, currentTime } = e.srcElement;
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
	}

	function setProgress(e) {
		const width = this.clientWidth;
		const clickX = e.offsetX;
		const duration = audio.duration;
		audio.currentTime = (clickX / width) * duration;
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
		currTime.innerHTML = min + ':' + sec;

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
		durTime.innerHTML = min_d + ':' + sec_d;
	}

	function updateQueueList() {
		queueList.innerHTML = '';
		for (let i = songIndex; i < currentPlaylist.length; i++) {
			const listItem = document.createElement('li');

			// Create an img element for the song image
			const img = document.createElement('img');
			img.src = `images/${currentPlaylist[i]}.jpeg`;
			img.alt = currentPlaylist[i];

			listItem.appendChild(img);

			// Create a span element for the song title
			const titleSpan = document.createElement('span');
			titleSpan.innerText = currentPlaylist[i];

			listItem.appendChild(titleSpan);

			if (i === songIndex) {
				// Add an outline to indicate the currently playing song
				listItem.classList.add('current-song');
			}

			queueList.appendChild(listItem);
		}
	}

	function updateLikeButton() {
		if (isLiked) {
			likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
		} else {
			likeBtn.innerHTML = '<i class="far fa-heart"></i>';
		}
	}

	function updateLikedSongs() {
		if (isLiked) {
			if (!playlists['liked-songs'].includes(currentPlaylist[songIndex])) {
				playlists['liked-songs'].push(currentPlaylist[songIndex]);
			}
		} else {
			const indexToRemove = playlists['liked-songs'].indexOf(currentPlaylist[songIndex]);
			if (indexToRemove !== -1) {
				playlists['liked-songs'].splice(indexToRemove, 1);
			}
		}
	}

	function updatePlaylistIndicator() {
		const playlistName = getPlaylistNameBySong(currentPlaylist[songIndex]);
		playlistIndicator.innerText = `Playing from: ${playlistName}`;
	}

	function getPlaylistNameBySong(song) {
		for (const [playlistName, songs] of Object.entries(playlists)) {
			if (songs.includes(song)) {
				return playlistName;
			}
		}
		return 'Unknown Playlist';
	}

	// Function to shuffle the current playlist
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

	audio.addEventListener('timeupdate', DurTime);

	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') {
			if (musicContainer.classList.contains('play')) {
				playSong();
			}
		}
	});
});
