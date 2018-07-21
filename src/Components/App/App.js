import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Track from '../Track/Track';
import TrackList from '../TrackList/TrackList';
import Spotify from '../../util/Spotify'



class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [{'name': '', 'artist': '', 'album': '', 'id': ''}],
      playlistName: 'New Playlist',
      playlistTracks: [{'name': '', 'artist': '', 'album': '', 'id': ''}]
    }
    this.state.searchResults = [];
    this.state.playlistTracks = [];

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
        return;
    } let currentTracks = this.state.playlistTracks;
    currentTracks.push(track);
    this.setState({playlistTracks: currentTracks});
  }

  removeTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    let currentTracks = this.state.playlistTracks;
    let trackIndex = currentTracks.indexOf(track);
    if (trackIndex > -1) {
      currentTracks.splice(trackIndex, 1);
      }
    this.setState({playlistTracks: currentTracks});
    }
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }

  savePlaylist() {
    let trackURIs = [];
    this.state.playlistTracks.forEach(track => {
      trackURIs.push(track.uri);
    })
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
    this.setState({playlistTracks: [], playlistName: 'New Playlist'});
  });
  }

  search(term) {
    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
