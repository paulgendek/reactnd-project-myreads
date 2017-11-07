import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { debounce } from 'lodash'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      results: [],
      shelves: [
        {
          title: 'Currently Reading',
          name: 'currentlyReading'
        },
        {
          title: 'Want to Read',
          name: 'wantToRead'
        },
        {
          title: 'Read',
          name: 'read'
        }
      ]
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.sort(sortBy('title'));
      this.setState({books})
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(prevState => {
        // push new books to state
        if (prevState.books.findIndex(b => b.id === book.id) === -1) {
          prevState.books.push(book);
          prevState.books.sort(sortBy('title'))
        }
      })
    })
  };

  searchBooks = debounce((query) => {
    if (query) {
      BooksAPI.search(query).then((results) => {
        if (results.length) {
          // remove results that are already on a shelf
          results = results.filter((book) => this.state.books.findIndex(b => b.id === book.id) === -1)
        }
        this.setState({results})
      })
    }
  }, 150);

  clearResults = () => {
    this.setState({results: []})
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBooks
              books={this.state.books}
              results={this.state.results}
              onUpdateBook={this.updateBook}
              onSearchBooks={this.searchBooks}
              onClearResults={this.clearResults}
          />
        )}/>
        <Route exact path="/" render={() => (
          <ListBooks
              books={this.state.books}
              shelves={this.state.shelves}
              onUpdateBook={this.updateBook}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
