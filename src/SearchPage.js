import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import {ShelfType} from './types';
import _ from 'lodash';

export default class SearchPage extends React.Component {
  static propTypes = {
    shelves: PropTypes.arrayOf(ShelfType).isRequired,
    getShelfByBook: PropTypes.func.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
  };

  state = {
    query: '',
    querying: false,
    books: []
  };

  render() {
    const {shelves, getShelfByBook, moveBookToShelf} = this.props;
    const {query, books, querying} = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              autoFocus
              value={query}
              onChange={evt => this.updateQuery(evt.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {querying && <div>Searching...</div>}
          {query && !querying && !books.length && <div>No books found!</div>}
          {!querying && (
            <ol className="books-grid">
              {books.map(book => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelfId={getShelfByBook(book)}
                    shelves={shelves}
                    moveBookToShelf={moveBookToShelf}
                  />
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    );
  }

  updateQuery = query => {
    this.setState({query, querying: true});
    this.searchBooks(query);
  };

  searchBooks = _.debounce(query => {
    if (!query) {
      this.setState({
        querying: false,
        books: []
      });
      return;
    }

    BooksAPI.search(query, 10).then(books => {
      if (Array.isArray(books)) {
        this.setState({books, querying: false});
      } else {
        this.setState({books: [], querying: false});
      }
    });
  }, 350);
}
