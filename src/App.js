import React from 'react';
import {Route} from 'react-router';
import './App.css';
import SearchPage from './SearchPage';
import ShelfPage from './ShelfPage';

class BooksApp extends React.Component {
  state = {
    bookShelfDict: {},

    shelfs: [
      {id: 'currentlyReading', title: 'Currently Reading'},
      {id: 'wantToRead', title: 'Want to Read'},
      {id: 'read', title: 'Read'}
    ],

    books: []
  };

  componentDidMount() {
    const serialized = localStorage.getItem('my-read-db');
    if (serialized) {
      this.setState(JSON.parse(serialized));
    }
  }

  componentDidUpdate() {
    localStorage.setItem('my-read-db', JSON.stringify(this.state));
  }

  getBooksInShelf = shelfId => {
    const {books, bookShelfDict} = this.state;
    return books.filter(book => bookShelfDict[book.id] === shelfId);
  };

  getShelfByBook = bookId => this.state.bookShelfDict[bookId] || 'none';

  moveBookToShelf = (book, shelfId) => {
    this.setState(prevState => {
      const newDict = {...prevState.bookShelfDict};
      let newBooks = [...prevState.books];

      if (shelfId === 'none') {
        if (prevState.bookShelfDict[book.id]) {
          if (window.confirm('Are you sure to remove this book?')) {
            delete newDict[book.id];
            newBooks = newBooks.filter(b => b.id !== book.id);
          } else {
            return {};
          }
        }
      } else {
        newDict[book.id] = shelfId;
        if (newBooks.find(b => b.id === book.id) == null) {
          newBooks = [...newBooks, book];
        }
      }

      return {
        bookShelfDict: newDict,
        books: newBooks
      };
    });
  };

  render() {
    const {shelfs} = this.state;
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchPage
              shelfs={shelfs}
              getShelfByBook={this.getShelfByBook}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ShelfPage
              shelfs={shelfs}
              getBooksInShelf={this.getBooksInShelf}
              moveBookToShelf={this.moveBookToShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
