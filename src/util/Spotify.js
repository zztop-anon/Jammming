
let accessToken = '';
let expiresIn = '';
const client_id = 'c83f4a4e95d04548bba92b4538b5eee1';
const redirect_uri = 'http://localhost:3000/';

const Spotify  {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    } else {
        const url = window.location.href
        const newToken = url.match(/access_token=([^&]*)/);
        const newExpire = url.match(/expires_in=([^&]*)/);

        //get the new token and expiration information and pass it in
        if(newToken && newExpire){
          accessToken = newToken[1];
          expiresIn = newExpire[1];
          //wipe token and expiration
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          window.history.pushState('Access Token', null, '/');
          return accessToken;
        }
        //access token is empty and not in the URL
        else{
          const urlstring = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
          window.location=urlstring;
        }
      }
    }
};


export default Spotify;
