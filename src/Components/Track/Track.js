import React from 'react';

class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3> track name will go here </h3> //track name
          <p> track artist will go here |  track album will go here </p> //track artist and ablum
        </div>
        <a className="Track-action"> + or - will go here </a> //+ or -
      </div>
    )
  }

  //CHECK THIS (isRemoval)
  renderAction() {
    if (Track.isRemoval) {
      return <a className="Track-action">-</a>
    } else {
      return <a className="Track-action">+</a>
    }

  }
}

export default Track;
