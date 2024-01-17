export async function loadLyrics(songId) {
  try {
    const response = await fetch(`lyrics/${songId}.txt`);
    const lyrics = await response.text();
    return lyrics;
  } catch (error) {
    console.error(`Error loading lyrics for ${songId}:`, error);
    return 'No lyrics available';
  }
}
