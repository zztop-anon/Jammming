import React from 'react';
import './SearchBar.css'


class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search(e) {
    this.props.onSearch(this.state.term);
    e.preventDefault();
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  handleEnterKeyPress = (e) => {
    if(e.key === 'Enter') {
      this.props.onSearch(this.state.term);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleEnterKeyPress}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
