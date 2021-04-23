
const fetch = require('node-fetch');

const key = 'wdvUmWbYZ2zk8tMSzwiZ'


  
  it('Leaderboard score created correctly.', async () => {
    const responsr = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: 'sam', score: '10' }),
      },
    );
    const result = await responsr.json();
  
    expect(result.result).toEqual('');
  });

  it('Should return some data', async () => {
    const data = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
    );
    const response = await data.json();
    expect(response.result[0].user).toEqual('sam');
  });