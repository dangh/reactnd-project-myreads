import React from 'react';
import PropTypes from 'prop-types';
import {BookType, ShelfType} from './types';
import BookShelfChanger from './BookShelfChanger';

function Book({book, shelves, shelfId, moveBookToShelf}) {
  const {title, authors, imageLinks} = book;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            backgroundImage: `url("${(imageLinks && imageLinks.thumbnail) ||
              'https://books.google.com.sg/googlebooks/images/no_cover_thumb.gif'}")`
          }}
        />
        <BookShelfChanger
          book={book}
          shelfId={shelfId}
          shelves={shelves}
          moveBookToShelf={moveBookToShelf}
        />
      </div>
      <div className="book-title">{title}</div>
      {authors && (
        <div className="book-authors">
          {authors.map(author => <div key={author}>{author}</div>)}
        </div>
      )}
    </div>
  );
}

Book.propTypes = {
  book: BookType.isRequired,
  shelfId: PropTypes.string,
  shelves: PropTypes.arrayOf(ShelfType).isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default Book;
