const playlists = {
  'liked-songs': [],
  'hip-hop-mix': ['BAND4BAND', 'Not-Like-Us', 'Mockingbird', 'WALK-UP', 'Blueberry-Faygo', 'Love-You-Better', 'Back-To-You', 'living-life-in-the-night-slowed', 'mathematical-disrespect', 'sea-of-thieves', 'i-see-london-i-see-france', 'spicy', 'thousand', 'RO7-3ALATOL', 'buster', 'hollywood-perfect', 'holiday', 'barking', 'outside', 'easier', 'slidin', 'mercedes', 'forever-never', 'curry', 'billie-eilish', 'dunkin-donuts', 'hope', 'sad!', 'bad', 'frick-love', 'passionfruit', 'teenage-fever', 'idgaf-(frick)', 'lovin-on-me', 'all-girls-are-the-same', 'the-box', 'ballin', 'fkumean', 'no-role-modelz', 'solo', 'bad', 'what-are-you-so-afraid-of', 'chain-gang', 'wet-dreamz', 'passionfruit', 'teenage-fever', 'i-hate-police', 'great-gatsby', 'butterfly-effect', 'space-cadet', 'zeze', 'not-fair', '223s', 'look-back-at-it', 'humble', 'like-this', 'overtime', 'rockstar', 'swervin', 'got-it-on-me', 'wat-u-want-2', 'frick-love'],
  'pop-mix': ['Beautiful-Things', 'drunk-text', 'you-were-there-for-me', 'pick-up-the-phone', 'i-like-the-way-you-kiss-me', 'STAY-(with-Justin-Bieber)', 'Pedro', 'Dancin-(feat.-Luvli)-Sped-Up-Version', 'Somebody-That-I-Used-To-Know', 'Ballin', 'Bad-Habit', 'sleepwalker', 'luxury', 'everybody-wants-to-rule-the-world', 'the-box', 'the-perfect-girl'],
  'j-pop': ['怪獣の花唄', 'しわあわせ', 'そんなbitterな話', '花占い', 'chainsaw-blood', '恋風邪にのせて', '美電球', '裸の勇者', 'odoriko', '世界の秘密', 'tokyo-flash', '名前は片想い', 'どうして', 'Subtitle', 'Pretender', 'I-Love', 'Universe', '宿命', 'パラボラ', 'Hello', 'Override', '青のすみか', 'sleepwalk', 'overdose', 'フライデー・ナイト', '猿芝居', 'エウレカ', 'cult.', 'きらり', 'hana', '満ちてゆく', '谺する', 'まちがいさがし', 'ラストシーン', '虹', 'ロングホープ・フィリア', '星を仰ぐ', '見たこともない景色', 'さよならエレジー', 'keep-on-running', 'ユアーズ', 'Cry-Baby', 'Mixed-Nuts', '115万キロのフィルム', '日常', '異端なスター', 'yesterday', 'white-noise', 'apoptosis', 'Tattoo', 'Driver', 'laughter', '幾億光年', '勿忘草', 'たけてん', 'アカリ', 'ひらり', 'ハロー カゲロウ', 'lemonade', 'ジュブナイル', '味方', '栞', '愛唄', '道', '遥か', '愛し君へ', 'ビリーヴ', '刹那', 'pride', 'green-boys', '蕾', 'ボクたちの電光石火', '涙空', 'hikari', 'インフェルノ', 'ダンスホール', 'rendez-vous', 'pink', '水平線', '冬と春', 'アイラブユー', 'ベルベットの詩', 'happy-birthday', 'クリスマスソング', '勝手にオリンピック', '黄色', 'エメラルド', '怪盗', '高嶺の花子さん', 'ベテルギウス', '夏音', '飛行船', 'ドライフラワー', 'シャッター', 'ビリミリオン', 'ただ君に晴れ', 'だから僕は音楽を辞めた', 'ブルーベリー・ナイツ', '怪物', 'ハルジオン', 'ハルカ', '夜に駆ける', 'あの夢をなぞって', 'アンコール', '勇者', 'heart-beat', 'ラブレター', '優しい彗星', 'たぶん', 'もしも命が描けたら', 'セブンティーン', 'もう少しだけ', '三原色', '祝福', 'ミスター', 'アドベンチャー', 'romance', '好きだ', 'アイドル', 'night-dancer', 'ヒロイン', 'nagisa', 'odoriko-dazbee-cover', 'ひまわりの約束', '栄光の架橋', '白日', 'カメレオン', '一途', 'boy', '残機', '打上花火', 'ピースサイン', '最高到達点', 'habit', '阿修羅ちゃん', 'うっせえわ', 'Tomorrow-never-knows',],
  'siglikore': ['youre-too-slow', 'hyptonic-data'],
  'sped-up': ['kompa-pasión', 'bounce', 'moment', 'ecstacy', 'slay-x-dancin-(krono-remix)'],
  'phonk': ['slay', 'funk-estranho-(super-slowed)', 'funked-up-(slowed)', 'metamorphosis', 'rapture', 'close-eyes', 'lovely-bastards', 'memory-reboot', 'devil-eyes', 'sahara', 'rave', 'aircraft', 'rainstorm', 'shadow', 'psycho-cruise', 'midnight', 'baixo', 'classical-phonk', 'ghost!', 'gigachad-theme', 'eggstreme-duck-phonk', 'brazilian-phonk-mano', 'brazilian-danca-phonk', 'unholy', 'murder-in-my-mind', 'a-million-ways-to-murder', 'scopin', 'live-another-day', 'murder-plot', 'tokyo-drift', 'avoid-me', 'neon-blade', 'montagem-celestial-de-atenas'],
  'hits-de-internet': ['moment', 'the-perfect-girl-the-motion-retrowave-remix', 'space-song', 'past-lives', 'after-dark', 'my-ordinary-life', 'kerosene', 'gigachad-theme', 'night-dancer', 'lovely-bastards', 'all-my-fellas', 'metamorphosis', 'close-eyes', 'close-eyes-sped-up', 'rave', 'an-enigmatic-encounter', 'chug-jug-with-you', 'live-another-day', 'murder-plot', 'tokyo-drift'],
  'meme-songs': ['burgers-in-the-back', 'last-rizzmas-i-gave-you-my-gyatt', 'indian-sleigh-ride-remix', 'indian-last-christmas-remix', 'king-on-a-budget-bk', 'whopper', 'nom-nom-nom-nom-nom-nom-nom', 'peppa-pig', 'loud-indian-music', 'careless-whisper', 'soviet-anthem', 'shimmy-shimmy-ay'],
  'slowed-and-reverbed': ['funk-estranho-(super-slowed)', 'funked-up-(slowed)', 'close-eyes-slowed-reverb', 'metamorphosis-slowed-reverb', 'living-life-in-the-night-slowed', 'lovely-bastards-slowed', 'memory-reboot-slowed'],
  'lofi-jazz': ['from-the-start', 'cupid', 'circus', 'that-kyoto-vibe', 'brazilian-beach-rumba', 'kyoto-nights', 'cactus-cafe', 'coffee-moments', 'jazz-in-my-coffee', 'sushi'],
  'holiday-party': ['last-rizzmas-i-gave-you-my-gyatt', 'indian-sleigh-ride-remix', 'indian-last-christmas-remix', 'mariahcarey', 'snowman', 'carol-of-the-bells', 'christmas-eve-==-sarajevo'],
  'classical': ['la-campanella', 'violin-concerto-in-e-minor', 'adagio-albinoni', 'trio-no-2-in-e-minor', 'moonlight-sonata'],
  'national-anthems': ['soviet-anthem', 'heil-dir-im-siegerkranz', 'horst-wessel-lied', 'deutschlandlied', 'la-marseillaise'],
  'todays-top-hits': ['greedy', 'it-girl', 'ecstacy', 'moonlight', 'only-in-my-mind', 'strangers', 'smooth-operator-(tiktok-remix)'],
  'chill-chill': ['passionfruit', 'bad-habit', 'snowman', 'moonlight', 'only-in-my-mind', 'smooth-operator-(tiktok-remix)', 'cupid', 'from-the-start'],
  '80s-hits': ['never-gonna-give-you-up', 'kyrie', 'careless-whisper', 'eye-in-the-sky', 'rebel-yell', 'runaway', 'everlasting-love', 'overkill', 'down-under', 'who-can-it-be-now', 'everywhere', 'africa', 'material-girl', 'morning-train', 'smooth-criminal', 'take-on-me', 'dont-stop-believin', 'separate-ways', 'dont-you-want-me', 'maneater', '空も飛べるはず', '踊り子', '初恋'],
  'rock-mix': ['rebel-yell', 'little-dark-age', 'scentless-apprentice', 'serve-the-slaves', 'i-hate-myself', 'moist-viagra', 'sappy', 'dumb', 'reap-me', 'heart-shaped-box', 'been-a-son', 'poisons-gone', 'and-I-Love-her', 'aberdeen', 'you-cant-change-me', 'rehash', 'clean-up-before-she-comes', 'burn-the-rain', 'what-more-can-i-say', 'the-yodel-song', 'do-re-mi-medley']
}

const songToArtistMap = {
  'BAND4BAND': 'Central Cee, Lil Baby',
  'Not-Like-Us': 'Kendrick Lamar',
  'Mockingbird': 'Eminem',
  'WALK-UP': 'Mills',
  'Blueberry-Faygo': 'Lil Mosey',
  'Kamikaze': 'Lil Mosey',
  'Love-You-Better': 'Tiagz',
  'Back-To-You': 'Kam Prada',
  'curry': 'vic sage',
  'billie-eilish': 'armani white',
  'dunkin-donuts': 'jakes birthday',

  'kompa-pasión': 'фрози',
  'bounce': 'фрози',

  'STAY-(with-Justin-Bieber)': 'The Kid LAROI, Justin Bieber',
  'Pedro': 'Jaxomy, Agatino Romero, Rafaella Carrà',
  'Dancin-(feat.-Luvli)-Sped-Up-Version': 'Aaron Smith, Krono, sped up + slowed, Luvli',
  'pick-up-the-phone': 'Henry Moodie',
  'drunk-text': 'Henry Moodie',
  'you-were-there-for-me': 'Henry Moodie',
  'Beautiful-Things': 'Benson Boone',
  'i-like-the-way-you-kiss-me': 'Artemas',
  'Somebody-That-I-Used-To-Know': 'Gotye, Kimbra',
  'Somebodys-Watching-Me': 'Rockwell',
  'Bad-Habit': 'Steve Lacy',
  'Luxury': 'Azealia Banks',
  'Everybody-Wants-To-Rule-The-World': 'Tears For Fears',
  'The-Perfect-girl': 'Mareux',
  'sleepwalker': 'akiaura, LONOWN, STM',
  'slay-x-dancin-(krono-remix)': 'aaron smith, slay',

  'kyrie': 'mr. mister',
  'eye-in-the-sky': 'the alan parsons project',
  'everlasting-love': 'howard jones',
  'overkill': 'men at work',
  'down-under': 'men at work',
  'who-can-it-be-now': 'men at work',
  'everywhere': 'fleetwood mac',
  'africa': 'toto',
  'material-girl': 'madonna',
  'morning-train': 'sheena easton',
  'smooth-criminal': 'michael jackson',
  'take-on-me': 'a-ha',
  'dont-stop-believin': 'journey',
  'dont-you-want-me': 'the human league',
  'maneater': 'daryl hall and john oates',
  'runaway': 'bon jovi',
  'never-gonna-give-you-up': 'rick astley',
  'separate-ways': 'journey',

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
  '優しい彗星': 'YOASOBI',
  'アドベンチャー': 'YOASOBI',
  'ラブレター': 'YOASOBI',
  'アンコール': 'YOASOBI',
  '勇者': 'YOASOBI',
  'romance': 'YOASOBI',
  'アイドル': 'YOASOBI',
  'たぶん': 'YOASOBI',
  '好きだ': 'YOASOBI',
  'heart-beat': 'YOASOBI',
  'うっせえわ': 'Ado',
  '阿修羅ちゃん': 'Ado',
  'night-dancer': 'imase',
  'nagisa': 'imase',
  'ヒロイン': 'imase',
  '道': 'GReeeen',
  '蕾': 'GReeeen',
  '愛唄': 'GReeeen',
  'たけてん': 'GReeeen',
  'アカリ': 'GReeeen',
  '遥か': 'GReeeen',
  '愛し君へ': 'GReeeen',
  'ビリーヴ': 'GReeeen',
  'ひらり': 'GReeeen',
  '涙空': 'GReeeen',
  'lemonade': 'GReeeen',
  '勿忘草': 'GReeeen',
  '味方': 'GReeeen',
  '栞': 'GReeeen',
  'green-boys': 'GReeeen',
  'ジュブナイル': 'GReeeen',
  'ボクたちの電光石火': 'GReeeen',
  '刹那': 'GReeeen',
  'pride': 'GReeeen',
  'ハロー カゲロウ': 'GReeeen',
  'odoriko': 'Vaundy',
  '世界の秘密': 'Vaundy',
  '怪獣の花唄': 'Vaundy',
  'しわあわせ': 'Vaundy',
  '不可幸力': 'Vaundy',
  'napori': 'Vaundy',
  '黒子': 'Vaundy',
  'chainsaw-blood': 'Vaundy',
  'そんなbitterな話': 'Vaundy',
  'tokyo-flash': 'Vaundy',
  '恋風邪にのせて': 'Vaundy',
  '裸の勇者': 'Vaundy',
  '忘れ物': 'Vaundy',
  '美電球': 'Vaundy',
  '花占い': 'Vaundy',
  'まぶた': 'Vaundy',
  '栄光の架橋': 'YUZU',
  '白日': 'King Gnu',
  '一途': 'King Gnu',
  'カメレオン': 'King Gnu',
  'sleepwalk': 'natori',
  'フライデー・ナイト': 'natori',
  '猿芝居': 'natori',
  'overdose': 'natori',
  'エウレカ': 'natori',
  'cult.': 'natori',
  'boy': 'King Gnu',
  'odoriko-dazbee-cover': 'DAZBEE, Vaundy',
  '打上花火': 'Daoko, Kenshi Yonezu',
  '青のすみか': 'Tatsuya Kitani',
  'きらり': 'Fujii Kaze',
  'hana': 'Fujii Kaze',
  '満ちてゆく': 'Fujii Kaze',
  'インフェルノ': 'Mrs. GREEN APPLE',
  'ダンスホール': 'Mrs. GREEN APPLE',
  '残機': 'ZUTOMAYO',
  'ベテルギウス': 'yuuri',
  '飛行船': 'yuuri',
  'rendez-vous': 'shytaupe',
  'pink': 'shytaupe',
  '水平線': 'back number',
  '怪盗': 'back number',
  '冬と春': 'back number',
  'アイラブユー': 'back number',
  '勝手にオリンピック': 'back number',
  'happy-birthday': 'back number',
  'エメラルド': 'back number',
  'ベルベットの詩': 'back number',
  '黄色': 'back number',
  'クリスマスソング': 'back number',
  '高嶺の花子さん': 'back number',
  'ただ君に晴れ': 'yorushika',
  'だから僕は音楽を辞めた': 'yorushika',
  'ブルーベリー・ナイツ': 'macaroni empitsu',
  'ひまわりの約束': 'motohiro hata',
  '谺する': 'SUDA MASAKI',
  'まちがいさがし': 'SUDA MASAKI',
  '星を仰ぐ': 'SUDA MASAKI',
  'ユアーズ': 'SUDA MASAKI',
  'さよならエレジー': 'SUDA MASAKI',
  '見たこともない景色': 'SUDA MASAKI',
  'ラストシーン': 'SUDA MASAKI',
  'ロングホープ・フィリア': 'SUDA MASAKI',
  '虹': 'SUDA MASAKI',
  'Tomorrow-never-knows': 'Mr.Children',
  'Subtitle': 'OFFICIAL HIGE DANDISM',
  'Pretender': 'OFFICIAL HIGE DANDISM',
  'I-Love': 'OFFICIAL HIGE DANDISM',
  '宿命': 'OFFICIAL HIGE DANDISM',
  'パラボラ': 'OFFICIAL HIGE DANDISM',
  'Hello': 'OFFICIAL HIGE DANDISM',
  'Cry-Baby': 'OFFICIAL HIGE DANDISM',
  'Universe': 'OFFICIAL HIGE DANDISM',
  '日常': 'OFFICIAL HIGE DANDISM',
  '異端なスター': 'OFFICIAL HIGE DANDISM',
  'Driver': 'OFFICIAL HIGE DANDISM',
  'Tattoo': 'OFFICIAL HIGE DANDISM',
  'Mixed-Nuts': 'OFFICIAL HIGE DANDISM',
  '115万キロのフィルム': 'OFFICIAL HIGE DANDISM',
  '幾億光年': 'Omoinotake',
  'hikari': 'androp',
  '名前は片想い': 'indigo la End',
  'どうして': 'Takase Toya, emi noda',
  'Override': 'Yoshida Yasei',

  'slay': 'eternxltz',
  'funk-estranho-(super-slowed)': 'alxike',
  'funked-up-(slowed)': 'xxanteria, isq',
  'metamorphosis': 'INTERWORLD',
  'rapture': 'INTERWORLD',
  'close-eyes': 'DVRST',
  'close-eyes-sped-up': 'DVRST',
  'lovely-bastards': 'ZWE1HVNDXR, yatashigang',
  'memory-reboot': 'VOJ, narvent',
  'devil-eyes': 'zodvic',
  'rave': 'dxrk ダーク',
  'aircraft': 'dxrk ダーク',
  'rainstorm': 'dxrk ダーク',
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
  'unholy': 'kordhell, dxrk ダーク',
  'murder-in-my-mind': 'kordhell',
  'scopin': 'kordhell',
  'murder-plot': 'kordhell',
  'live-another-day': 'kordhell',
  'a-million-ways-to-murder': 'kordhell',
  'tokyo-drift': 'PRXSXNT FXTURE',
  'hyptonic-data': 'odetari',
  'avoid-me': 'KUTE',
  'neon-blade': 'moondeity',

  'from-the-start': 'laufey',

  'close-eyes-slowed-reverb': 'DVRST',
  'metamorphosis-slowed-reverb': 'INTERWORLD',
  'lovely-bastards-slowed': 'ZWE1HVNDXR, yatashigang',
  'memory-reboot-slowed': 'VOJ, narvent',

  'youre-too-slow': 'odetari',
  'montagem-celestial-de-atena': 'dj orbital',

  'indian-sleigh-ride-remix': 'vindaloo singh',
  'indian-last-christmas-remix': 'vindaloo singh',
  'careless-whisper': 'george michael',
  'shimmy-shimmy-ay': 'shimmy ah',

  'my-ordinary-life': 'the living tombstone',
  'after-dark': 'mr. kitty',
  'chug-jug-with-you': 'leviathanJPTV',
  'kerosene': 'crystal castles',
  'past-lives': 'sapientdream',
  'moment': 'vierre cloud',
  'the-perfect-girl-the-motion-retrowave-remix': 'mareux, the motion',
  'space-song': 'beach house',

  'all-girls-are-the-same': 'juice wrld',
  'what-are-you-so-afraid-of': 'XXXTENTACION',
  'frick-love': 'XXXTENTACION',
  'hope': 'XXXTENTACION',
  'got-it-on-me': 'pop smoke',
  'wat-u-want-2': 'yeat',
  'the-box': 'roddy ricch',
  'ballin': 'roddy ricch, mustard',
  'fkumean': 'gunna',
  'no-role-modelz': 'j. cole',
  'wet-dreamz': 'j. cole',
  'chain-gang': 'anti da menace',
  'i-hate-police': 'N.W.A',
  'lovin-on-me': 'jack harlow',
  'sad!': 'XXXTENTACION',
  'zeze': 'kodak black',
  'butterfly-effect': 'travis scott',
  'great-gatsby': 'rod wave',
  'space-cadet': 'metro boomin',
  'not-fair': 'The Kid LAROI',
  'bad': 'XXXTENTACION',
  '223s': 'YNW melly',
  'look-back-at-it': 'a boogie wit da hoodie',
  'swervin': 'a boogie wit da hoodie',
  'rockstar': 'da baby',
  'humble': 'kendrick lamar',
  'overtime': 'ken carson',
  'like-this': 'ken carson',

  'mariahcarey': 'all i want for christmas is youuuuu 🎄',
  'snowman': 'sia',
  'last-rizzmas-i-gave-you-my-gyatt': 'every fortnite kid',
  'burgers-in-the-back': 'ai caseoh',

  'greedy': 'tate mcrae',
  'it-girl': "aliyah's interlude",
  'ecstacy': 'su1c1de idol',
  'moonlight': 'kali uchis',
  'only-in-my-mind': 'kenya grace',
  'strangers': 'kenya grace',
  'smooth-operator-(tiktok-remix)': 'sade',

  'soviet-anthem': 'soviet union',
  'heil-dir-im-siegerkranz': 'heinrich harrie',
  'horst-wessel-lied': 'horst wessel',
  'deutschlandlied': 'joseph haydn',
  'la-marseillaise': 'claude joseph rouget de lisle',

  'la-campanella': 'rousseau',
  'violin-concerto-in-e-minor': 'felix mendelsshon',
  'adagio-albinoni': 'tomaso albinoni',
  'trio-no-2-in-e-minor': 'franz schubert',
  'moonlight-sonata': 'beethoven',

  'passionfruit': 'drake',
  'teenage-fever': 'drake',
  'idgaf-(frick)': 'drake',

  'reap-me': 'nirvana',
  'heart-shaped-box': 'nirvana',
  'dumb': 'nirvana',
  'sappy': 'nirvana',
  'moist-viagra': 'nirvana',
  'i-hate-myself': 'nirvana',
  'serve-the-slaves': 'GET BACK 2 WORK (nirvana)',
  'scentless-apprentice': 'nirvana',

  'poisons-gone': 'kurt cobain',
  'and-I-Love-her': 'kurt cobain',
  'aberdeen': 'kurt cobain',
  'you-cant-change-me': 'kurt cobain',
  'rehash': 'kurt cobain',
  'clean-up-before-she-comes': 'kurt cobain',
  'burn-the-rain': 'kurt cobain',
  'what-more-can-i-say': 'kurt cobain',
  'been-a-son': 'nirvana',
  'the-yodel-song': 'kurt cobain',
  'do-re-mi-medley': 'kurt cobain',

  '踊り子': 'kozo murashita',
  '初恋': 'kozo murashita',
  'neglect': 'mr. kitty',
  '空も飛べるはず': 'spitz',

  'little-dark-age': 'mgmt',

  'all-my-fellas': 'frizk',

  'carol-of-the-bells': 'lindsey stirling',
  'christmas-eve-==-sarajevo': 'trans-siberian orchestra',

  'rebel-yell': 'billy idol',
  'freebird': 'lynyrd skynyrd',

};

export { playlists, songToArtistMap };