import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger';

const Book = ({ book, onUpdateBook }) =>  {
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
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateBook: PropTypes.func.isRequired
};

export default Book