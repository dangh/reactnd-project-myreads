import React from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import {ShelfType} from './types';

const shelves = [
  {id: 'currentlyReading', title: 'Currently Reading'},
  {id: 'wantToRead', title: 'Want to Read'},
  {id: 'read', title: 'Read'}
];

export default class BookStore extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  state = {
    books: []
  };

  static childContextTypes = {
    bookstore: PropTypes.shape({
      shelves: PropTypes.arrayOf(ShelfType).isRequired,
      getBooksInShelf: PropTypes.func.isRequired,
      getShelfByBook: PropTypes.func.isRequired,
      moveBookToShelf: PropTypes.func.isRequired
    }).isRequired
  };

  getChildContext() {
    return {
      bookstore: {
        shelves,
        getBooksInShelf: this.getBooksInShelf,
        getShelfByBook: this.getShelfByBook,
        moveBookToShelf: this.moveBookToShelf
      }
    };
  }

  /**
   * life-cycle methods
   */

  componentDidMount() {
    const serialized = localStorage.getItem('my-read-db');
    if (serialized) {
      this.setState(JSON.parse(serialized));
    }

    // Sync local db with server.
    BooksAPI.getAll().then(books => this.setState({books}));
  }

  componentDidUpdate() {
    localStorage.setItem('my-read-db', JSON.stringify(this.state));
  }

  /**
   * context methods
   */

  render() {
    return this.props.children;
  }

  getBooksInShelf = shelfId => {
    const {books} = this.state;
    return books.filter(book => book.shelf === shelfId);
  };

  getShelfByBook = book => {
    if (book.shelf) {
      // This book is already in our shelf.
      return book.shelf;
    }

    // Probably from search result. Look up in our shelf if we already have it.
    const localBook = this.state.books.find(b => b.id === book.id);
    if (localBook) {
      return localBook.shelf;
    }

    // This book is not in our shelf.
    return 'none';
  };

  updateBookLocation = (book, shelfId) => {
    BooksAPI.update(book, shelfId).then(dict => {
      const {books} = this.state;

      // Get all book ids as array. We want to keep the order in each shelf.
      const bookIds = [].concat.apply([], Object.values(dict));

      // Build collection of books from local data.
      const newBooks = bookIds.map(bookId => {
        const book = books.find(b => b.id === bookId);

        if (!book) return null;

        // Find the shelf of this book.
        const shelfId = Object.keys(dict).find(s => dict[s].includes(bookId));

        return {
          ...book,
          shelf: shelfId
        };
      });

      // Some books are missing. Local data is mismatch. Re-sync all data from server.
      if (newBooks.some(book => book == null)) {
        BooksAPI.getAll().then(books => this.setState({books}));
      } else {
        // All good.
        this.setState({books: newBooks});
      }
    });
  };

  moveBookToShelf = (book, shelfId) => {
    if (shelfId === 'none') {
      if (window.confirm('Are you sure to remove this book?')) {
        this.updateBookLocation(book, shelfId);
      }
    } else {
      this.updateBookLocation(book, shelfId);
    }
  };
}
