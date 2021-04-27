const key = 'Uh2fXVQusd6Esz5AkTkR';

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;


const fetch = require('node-fetch');


const leaderboard = (() => {
  const addScore = async (name, score) => {
    const body = JSON.stringify({ user: name, score });
    const response = await fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });

    return response;
  };


  const getInfo = async () => {
    const data = await fetch(url, { mode: 'cors' }).then((response) => response.json());

    return data;
  };

  return {
    addScore,
    getInfo,
  };
})();


export default leaderboard;