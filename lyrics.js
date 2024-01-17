const url = 'https://deezerdevs-deezer.p.rapidapi.com/infos';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f033d65485msh348f5e5c1e6af6cp102039jsn3cd26801d648',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  }
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}