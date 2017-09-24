import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Bookshelf from './Bookshelf';
import Book from './Book';
import {ShelfType} from './types';

export default class ShelfPage extends React.Component {
  static propTypes = {
    shelfs: PropTypes.arrayOf(ShelfType).isRequired,
    getBooksInShelf: PropTypes.func.isRequired,
    moveBookToShelf: PropTypes.func.isRequired
  };

  render() {
    const {shelfs, getBooksInShelf, moveBookToShelf} = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map(shelf => (
              <Bookshelf key={shelf.id} title={shelf.title}>
                {getBooksInShelf(shelf.id).map(book => (
                  <Book
                    key={book.id}
                    book={book}
                    shelfId={shelf.id}
                    shelfs={shelfs}
                    moveToShelf={moveBookToShelf}
                  />
                ))}
              </Bookshelf>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
