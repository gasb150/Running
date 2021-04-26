 const fetch = require("node-fetch");

 let game = { "name": "Robot Jumping"}

 const posted = JSON.stringify(game)

 const url= 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games';
 const option = {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: posted
   }


// //   wdvUmWbYZ2zk8tMSzwiZ
 let name = (async () => {
     const response = await fetch( url, option);
     const content = await response.json();
  
     console.log(content);
   })();

   name

// const key = ' 0A1hDOyWvxpNfoFwfC8o'

// const url = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`;


// const fetch = require('node-fetch');



//   const addScore = (name, score) => {
//     const body = JSON.stringify({ user: name, score, });
//     const promiseAddScore = fetch(url, {
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//       body,
//     });
//   }

//   addScore('Gustavo', 10)
//   addScore('Tavo', 50)

//   addScore('Tave', 200)

//   addScore('7aves', 300 )

//   addScore('Chaos', 150)
