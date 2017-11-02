import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

class ShelfChanger extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  render() {
    const { book, onUpdateBook } = this.props;
    
    return (
      <div className="book-shelf-changer">
        <select value={book.shelf || 'none'} onChange={(e) => onUpdateBook(book, e.target.value)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <Route exact path="/" render={() => (
              <option value="none">None</option>
          )}/>
        </select>
      </div>
    )
  }
}

export default ShelfChanger