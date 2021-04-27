const key = 'Uh2fXVQusd6Esz5AkTkR';

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;

const fetch = require('node-fetch');

const leaderboard = (() => {
  const addScore = async (name, score) => {
    const body = JSON.stringify({ user: name, score });

    const settings = {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    };

    const response = await fetch(url, settings);
    return response;
  };

  const getInfo = async () => {
    try {
      const data = await fetch(url, { mode: 'cors' }).then((response) => response.json());

      return data;
    } catch (error) {
      throw Error('Not data found');
    }
  };

  return {
    addScore,
    getInfo,
  };
})();

export default leaderboard;