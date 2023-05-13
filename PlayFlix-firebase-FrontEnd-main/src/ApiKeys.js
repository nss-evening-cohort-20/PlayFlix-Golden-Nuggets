// Rename this file to apiKeys.js and add your config keys

export const firebaseConfig = {
  apiKey: "AIzaSyCBSUB6tbhxaGfVsvX5_sBEo2E9HzWNbJg",
  authDomain: "playflix-1e39e.firebaseapp.com",
  projectId: "playflix-1e39e",
  storageBucket: "playflix-1e39e.appspot.com",
  messagingSenderId: "768528677602",
  appId: "1:768528677602:web:d307610a8efad4e4bf3cbb"
};

export const searchGames = async (searchParams) => {
  const search = searchParams.replace(/\s/g, '')   
  const req = await fetch(`https://localhost:7215/api/Games/search?query=${search}`);
  const resp = await req.json();
  return await resp
}