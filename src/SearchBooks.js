import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book';
import PropTypes from 'prop-types';

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onUpdateBook: PropTypes.func.isRequired,
    onClearResults: PropTypes.func.isRequired
  };

  state = {
    query: ''
  };

  updateQuery = (query) => {
    this.setState({query: query.trim()});
    this.searchBooks(this.state.query)
  };

  searchBooks = (query) => {
    this.props.onSearchBooks(query)
  };

  render() {
    const { results, onUpdateBook, onClearResults } = this.props;
    const { query } = this.state;

    let showingBooks = [];
    if (results) {
      showingBooks = results.length ? results : []
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={onClearResults} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={onUpdateBook}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks