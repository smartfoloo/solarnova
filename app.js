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

	let playlists = {
		'liked-songs': ['怪物', 'ハルジオン', 'metamorphosis'],
		'playlist-2': ['Song1', 'Song2', 'Song3']
	};

	let currentPlaylist = [];
	let queue = [];

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

	let songIndex = 0;

	function loadSong(index) {
		title.innerText = currentPlaylist[index];
		audio.src = `music/${currentPlaylist[index]}.mp3`;
		cover.src = `images/${currentPlaylist[index]}.png`;
		songIndex = index;

		// Update the queue list
		updateQueueList();
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
		for (let i = songIndex + 1; i < currentPlaylist.length; i++) {
			const listItem = document.createElement('li');

			// Create an img element for the song image
			const img = document.createElement('img');
			img.src = `images/${currentPlaylist[i]}.png`;
			img.alt = currentPlaylist[i];

			listItem.appendChild(img);

			// Create a span element for the song title
			const titleSpan = document.createElement('span');
			titleSpan.innerText = currentPlaylist[i];

			listItem.appendChild(titleSpan);

			queueList.appendChild(listItem);
		}
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
		} else {
			playSong();
		}
	});
});
