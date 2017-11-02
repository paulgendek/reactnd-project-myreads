import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
  };

  render() {
    const { book, onUpdateBook } = this.props;
    const { imageLinks } = book;

    return (
      <div className="book">
        <div className="book-top">
          {imageLinks && (
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` }}/>
          )}
          <ShelfChanger book={book} onUpdateBook={onUpdateBook} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.map((author, i) => (`${author}${book.authors[i+1] ? ', ' : ''}`))}</div>
      </div>
    )
  }
}

export default Book