const key = ' 0A1hDOyWvxpNfoFwfC8o'

const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;


const fetch = require('node-fetch');


const leaderboard = (() => {
  const addScore = (name, score) => {
    const body = JSON.stringify({ user: name, score, });
    fetch(url, {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });
  }


  const getInfo = async () => {
    const data = await fetch(url, { mode: 'cors', }).then(response => response.json());
    
    return data
  }
  let y=getInfo()
  console.log(y)
  return{
    addScore,
    getInfo
  }

})()



export default leaderboard