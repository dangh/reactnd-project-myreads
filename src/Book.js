import React from 'react';
import {BookType} from './types';
import BookShelfChanger from './BookShelfChanger';

function Book({book}) {
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
        <BookShelfChanger book={book} />
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
  book: BookType.isRequired
};

export default Book;
