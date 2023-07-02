const URL = 'https://pixabay.com/api/';
const KEY = '36612658-29e1993b7f5cae28e7421abef';

export default function fetchAPI(query, page = 1) {
  return fetch(
    `${URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    return response.json();
  });
}
