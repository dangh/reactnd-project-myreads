import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Book from './Book';
import {ShelfType} from './types';
import QueryString from './QueryString';
import SearchResult from './SearchResult';

function SearchPage({shelves, getShelfByBook, moveBookToShelf}) {
  return (
    <QueryString>
      {({query, updateQuery}) => (
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
                onChange={evt => updateQuery(evt.target.value)}
              />
            </div>
          </div>
          <SearchResult query={query}>
            {({querying, books}) => (
              <div className="search-books-results">
                {querying ? (
                  <div>Searching...</div>
                ) : query && !books.length ? (
                  <div>No books found!</div>
                ) : (
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
            )}
          </SearchResult>
        </div>
      )}
    </QueryString>
  );
}

SearchPage.propTypes = {
  shelves: PropTypes.arrayOf(ShelfType).isRequired,
  getShelfByBook: PropTypes.func.isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default SearchPage;
