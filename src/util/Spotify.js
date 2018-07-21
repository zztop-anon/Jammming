
let accessToken = '';
let expiresIn = '';
const client_id = 'c83f4a4e95d04548bba92b4538b5eee1';
const redirect_uri = 'https://JAMMMING_SPOTIFY.surge.sh';

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
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
    },



    search(term){
        let accessToken = Spotify.getAccessToken();
        let searchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(searchURL, {
          headers: {Authorization: `Bearer ${accessToken}`}
        })
        .then(
          response => { //used to check if we got a response and then convert response to JSON format
          if (response.ok) {
            return response.json();
          }
            throw new Error('Request failed!');
        },
        networkError => {
          console.log(networkError.message);
        })

          .then(jsonResponse => {
              //if the JSON response returns no tracks we wish to return an empty array
              if(!jsonResponse.tracks){
                return [];
              }
              //otherwise we need to map the tracks to the appropriate properties
              else{
                return jsonResponse.tracks.items.map(track => ({
                  id: track.id,
                  name: track.name,
                  artist: track.artists[0].name,
                  album: track.album.name,
                  uri: track.uri,
                  preview_url: track.preview_url,
                  duration: track.duration_ms,
                  explicit: track.explicit
                }));
              }
            });
      },


      savePlaylist(playlistName, trackURIs) {
        console.log(accessToken);

        if(!accessToken){
        accessToken = Spotify.getAccessToken();
        }

        const headers = {Authorization: `Bearer ${accessToken}`};
        let user_id = '';

        if(!playlistName&&!trackURIs){
          return;
        }
         else{
           return fetch('https://api.spotify.com/v1/me', {headers: headers}).then(response =>{
           return response.json();
           }).then(jsonResponse =>{
             user_id = jsonResponse.id;
             console.log(user_id);

      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        method: 'POST',
        body: JSON.stringify({name: playlistName})
      }).then(response => {
        return response.json();
        }).then(jsonResponse => {
          let playlist_id = jsonResponse.id;
          console.log(playlist_id);

      return fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}/tracks`, {
        headers: {Authorization: `Bearer ${accessToken}`,
        "Content-Type": 'application/json'},
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
        });
      });
    });
   }
 }
};

export default Spotify;
