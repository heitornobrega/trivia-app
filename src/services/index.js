const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';

export const fetchApi = () => fetch(ENDPOINT)
  .then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));

export const fetchTriviaApi = (token) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))));
