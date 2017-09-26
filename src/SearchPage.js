import React from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
import QueryString from './QueryString';
import SearchResult from './SearchResult';

function SearchPage() {
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
                        <Book book={book} />
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

export default SearchPage;
