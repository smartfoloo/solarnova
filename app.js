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
	const queueList = document.getElementById('queue-list');
	const likeBtn = document.getElementById('like-btn');
	const shuffleBtn = document.getElementById('shuffle-btn'); // Add this line
	const installApp = document.getElementById('installApp');

	//PWA GODS
	function PWAGODS(){
		if (deferredPrompt !== null) {
			deferredPrompt.prompt();
		}
	};

	let playlists = {
		'liked-songs': [],
		'j-pop': ['怪物', 'ハルジオン', 'ハルカ', '夜に駆ける', 'あの夢をなぞって', '三原色', '祝福', 'セブンティーン', 'もう少しだけ', 'もしも命が描けたら', 'ミスター', 'うっせえわ'],
    'siglikore': ['youre-too-slow', 'hyptonic-data'],
    'phonk': ['metamorphosis', 'rapture', 'close-eyes', 'lovely-bastards', 'memory-reboot', 'devil-eyes', 'sahara', 'rave', 'aircraft', 'rainstorm', 'shadow', 'psycho-cruise', 'midnight', 'baixo', 'classical-phonk', 'ghost!', 'gigachad-theme', 'eggstreme-duck-phonk', 'brazilian-phonk-mano', 'brazilian-danca-phonk', 'unholy', 'murder-in-my-mind', 'scopin', 'tokyo-drift', 'avoid-me', 'neon-blade','montagem-celestial-de-atenas'],
		'gaming-tracks': ['my-ordinary-life', 'metamorphosis', 'close-eyes', 'close-eyes-sped-up', 'rave', 'after-dark', 'chug-jug-with-you', 'kerosene', 'past-lives'],
		'meme-songs': ['king-on-a-budget-bk', 'whopper', 'nom-nom-nom-nom-nom-nom-nom', 'peppa-pig', 'loud-indian-music', 'soviet-anthem'],
		'slowed-and-reverb': ['close-eyes-slowed-reverb', 'metamorphosis-slowed-reverb', 'living-life-in-the-night-slowed'],
		'vibes': ['blueberry-faygo', 'back-to-you', 'love-you-better', 'living-life-in-the-night-slowed', 'sea-of-thieves', 'i-see-london-i-see-france', 'spicy', 'thousand', 'RO7-3ALATOL', 'lemonade', 'buster', 'mathematical-disrespect', 'hollywood-perfect', 'holiday', 'barking', 'outside', 'easier', 'slidin', 'mercedes', 'forever-never'],
		'lofi-jazz': ['from-the-start','cupid','circus', 'that-kyoto-vibe', 'brazilian-beach-rumba', 'kyoto-nights', 'cactus-cafe', 'coffee-moments', 'jazz-in-my-coffee', 'sushi'],
		'seasonal': ['mariahcarey', 'snowman'],
		'mix': ['paint-the-town-red', 'somebody-that-i-used-to-know', 'somebodys-watching-me', 'ballin', 'bad-habit', 'luxury', 'everybody-wants-to-rule-the-world', 'the-box', 'the-perfect-girl'],
		'rap': ['lovin-on-me','all-girls-are-the-same', 'the-box', 'ballin','fkumean','no-role-modelz','solo','bad','what-are-you-so-afraid-of','chain-gang','wet-dreamz','passionfruit','teenage-fever','i-hate-police','great-gatsby','butterfly-effect','space-cadet','zeze','not-fair','223s','look-back-at-it'],
		'pop1': ['paint-the-town-red', 'somebody-that-i-used-to-know', 'somebodys-watching-me', 'ballin', 'bad-habit', 'sleepwalker','luxury', 'everybody-wants-to-rule-the-world', 'the-box', 'the-perfect-girl'],
		'classical': ['violin-concerto-in-e-minor', 'adagio-albinoni', 'trio-no-2-in-e-minor', 'moonlight-sonata'],
    'national-anthems': ['soviet-anthem', 'heil-dir-im-siegerkranz', 'horst-wessel-lied', 'deutschlandlied', 'la-marseillaise'],
		'tth': ['greedy','it-girl','ecstasy','moonlight','only-in-my-mind','strangers','smooth-operator-(tiktok-remix)'],
		'drakeywakey' :['passionfruit','teenage-fever','idgaf-(frick)'],
		'xxxtentacion' :['sad!','all-girls-are-the-same','what-are-you-so-afraid-of','bad']
	}


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
		let selectedSong;

		if (currentPlaylist.length > 0 && index >= 0 && index < currentPlaylist.length) {
			selectedSong = currentPlaylist[index];
			console.log('Loading song:', selectedSong); // Log the selected song

			title.innerText = selectedSong.replace(/-/g, " ");
			audio.src = `music/songs/${selectedSong}.mp3`; // Check if the path and file name match your audio files
			cover.src = `music/images/${selectedSong}.jpeg`;
			songIndex = index;

			updateQueueList();

			// Update like button state
			isLiked = playlists['liked-songs'].includes(currentPlaylist[songIndex]);
			updateLikeButton();

			// Update playlist indicator
			updatePlaylistIndicator();

			// Log the audio source being set
			console.log('Audio source:', audio.src);
      

			// Play the song (if needed)
			playSong();
			const songToArtistMap = {
        // yoasobi
        '怪物': 'YOASOBI',
        'ハルジオン': 'YOASOBI',
        'ハルカ': 'YOASOBI',
        '夜に駆ける': 'YOASOBI',
        'あの夢をなぞって': 'YOASOBI',
        '三原色': 'YOASOBI',
        '祝福': 'YOASOBI',
        'セブンティーン': 'YOASOBI',
        'もう少しだけ': 'YOASOBI',
        'もしも命が描けたら': 'YOASOBI',
        'ミスター': 'YOASOBI',
        // phonk
				'metamorphosis': 'INTERWORLD',
        'rapture': 'INTERWORLD',
				'close-eyes': 'DVRST',
				'close-eyes-slowed-reverb': 'DVRST',
				'close-eyes-sped-up': 'DVRST',
				'lovely-bastards': 'ZWE1HVNDXR, yatashigang',
				'memory-reboot': 'VOJ, narvent',
				'devil-eyes': 'zodvic',
				'rave': 'dxrk',
				'aircraft': 'dxrk',
        'rainstorm': 'dxrk',
				'sahara': 'hensonn',
        'shadow': 'ONIMXRU, SMITHMANE',
        'psycho-cruise': 'ONIMXRU, STRAWANGLE',
        'midnight': 'PLAYAMANE X NATEKI',
        'baixo': 'xxanteria',
        'ghost!': 'phonk.me',
				'classical-phonk': 'BEETHOVEN HIMSELF!!!!!!',
        'eggstreme-duck-phonk': 'sma$her',
        'gigachad-phonk-theme': 'g3ox_em',
        'brazilian-phonk-mano': 'slow-boy',
        'brazilian-danca-phonk': '6YNTHMANE',
        'unholy': 'kordhell, dxrk',
        'murder-in-my-mind': 'kordhell',
        'scopin': 'kordhell',
        'tokyo-drift': 'PRXSXNT FXTURE',
        'hyptonic-data': 'odetari',
        'avoid-me': 'KUTE',
        'neon-blade': 'moondeity',
        // siglikore
        'youre-too-slow': 'odetari',
		    'montagem-celestial-de-atena': 'dj orbital',
        // gaming 
        'my-ordinary-life': 'the living tombstone',
        'after-dark': 'mr. kitty',
        'chug-jug-with-you': 'leviathanJPTV',
        'kerosene': 'crystal castles',
        'past-lives': 'sapientdream',
				// rap
				'all-girls-are-the-same': 'xxxtentacion',
				'what-are-you-so-afraid-of': 'xxxtentacion',
				'the-box': 'roddy ricch',
				'ballin': 'roddy ricch, mustard',
				'fkumean': 'gunna',
				'no-role-modelz': 'j. cole',
				'wet-dreamz': 'j. cole',
				'chain-gang': 'anti da menace',
				'i-hate-police': 'N.W.A',
				'lovin-on-me': 'jack harlow',
				'sad!': 'xxxtentacion',
				'zeze': 'kodak black',
				'butterfly-effect': 'travis scott',
				'great-gatsby': 'rod wave',
				'space-cadet': 'metro boomin',
				'not-fair': 'the kid laroi',
				'bad': 'xxxtentacion',
				'223s': 'YNW melly',
				'look-back-at-it': 'a boogie wit da hoodie',
				// pop
				'paint-the-town-red': '✨💅doja cat!1!💅✨',
				'somebody-that-i-used-to-know': 'gotye (official aussie)',
				'somebodys-watching-me': '👀 rockwell',
				'bad-habit': 'steve lacy',
				'luxury': 'azealia banks',
				'everybody-wants-to-rule-the-world': 'tears for fears',
				'the-perfect-girl': 'mareux',
				'sleepwalker': 'akiaura, LONOWN, STM',
				// seasonal
				'mariahcarey': 'all i want for christmas is youuuuu 🎄',
				'snowman': 'sia',
				// top hits
				'greedy': 'tate mcrae',
				'it-girl': "aliyah's interlude",
				'ecstasy': 'su1c1de idol',
				'moonlight': 'kali uchis',
				'only-in-my-mind': 'kenya grace',
				'strangers': 'kenya grace',
				'smooth-operator-(tiktok-remix)': 'sade',
        // national anthems 
        'soviet-anthem': 'soviet union',
        'heil-dir-im-siegerkranz': 'heinrich harrie',
        'horst-wessel-lied': 'horst wessel',
        'deutschlandlied': 'joseph haydn',
        'la-marseillaise': 'claude joseph rouget de lisle',
		// classyical
        'violin-concerto-in-e-minor': 'felix mendelsshon',
        'adagio-albinoni': 'tomaso albinoni',
        'trio-no-2-in-e-minor': 'franz schubert',
        'moonlight-sonata': 'beethoven',
		// drakewakey
		'passionfruit': 'drake',
		'teenage-fever': 'drake',
		'idgaf-(frick)': 'drake',
			};
			
			function getArtistForSong(songNamee) {
				return songToArtistMap[songNamee] || 'Unknown Artist';
			}
			
			const currentSongFileName = selectedSong;
			const artist = getArtistForSong(currentSongFileName);

      const artistElement = document.getElementById('artist');
      artistElement.innerText = artist || 'Unknown Artist'; 

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


	function playSong() {
		musicContainer.classList.add('play');
		playBtn.querySelector('i.fas').classList.remove('fa-play');
		playBtn.querySelector('i.fas').classList.add('fa-pause');
		audio.play();
		navigator.mediaSession.playbackState = "playing";
	}

	function pauseSong() {
		musicContainer.classList.remove('play');
		playBtn.querySelector('i.fas').classList.add('fa-play');
		playBtn.querySelector('i.fas').classList.remove('fa-pause');
		audio.pause();
		navigator.mediaSession.playbackState = "paused";
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
		for (let i = songIndex; i < currentPlaylist.length; i++) {
			const listItem = document.createElement('li');

			// Create an img element for the song image
			const img = document.createElement('img');
			img.src = `music/images/${currentPlaylist[i]}.jpeg`;
			img.alt = currentPlaylist[i];

			listItem.appendChild(img);

			// Create a span element for the song title
			const titleSpan = document.createElement('span');
			titleSpan.innerText = currentPlaylist[i].replace(/-/g, " ");;

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

	// Function to shuffle the current playlist
	function shufflePlaylist() {
		for (let i = currentPlaylist.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[currentPlaylist[i], currentPlaylist[j]] = [currentPlaylist[j], currentPlaylist[i]];
		}
		loadSong(0);
		playSong();
	}

  function createArtistCards() {
    const artistContainer = document.getElementById('artist-container');

    // Get all unique artists from the playlists
    const allArtists = new Set(Object.values(songToArtistMap));
    const sortedArtists = Array.from(allArtists).sort();

    sortedArtists.forEach(artist => {
      const artistCard = document.createElement('div');
      artistCard.classList.add('artist-card');
      artistCard.setAttribute('data-artist', artist);

      const title = document.createElement('h3');
      title.classList.add('title');
      title.innerText = artist;

      artistCard.appendChild(title);
      artistContainer.appendChild(artistCard);

      // Add click event listener to play songs by the artist
      artistCard.addEventListener('click', () => {
        const songsByArtist = Object.keys(songToArtistMap).filter(song => songToArtistMap[song] === artist);
        if (songsByArtist.length > 0) {
          currentPlaylist = songsByArtist;
          loadSong(0);
          playSong();
        }
      });
    });
  }

  // Call the function to create and append artist cards
  createArtistCards();

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
