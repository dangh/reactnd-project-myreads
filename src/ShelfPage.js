import React from 'react';
import {Link} from 'react-router-dom';
import Bookshelf from './Bookshelf';
import Book from './Book';
import BookManager from './BookManager';

function ShelfPage() {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookManager>
          {({shelves, getBooksInShelf}) => (
            <div>
              {shelves.map(shelf => (
                <Bookshelf key={shelf.id} title={shelf.title}>
                  {getBooksInShelf(shelf.id).map(book => (
                    <Book key={book.id} book={book} />
                  ))}
                </Bookshelf>
              ))}
            </div>
          )}
        </BookManager>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

export default ShelfPage;
