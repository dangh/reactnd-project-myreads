import React from 'react';
import {BookType} from './types';
import BookManager from './BookManager';

function BookShelfChanger({book}) {
  return (
    <div className="book-shelf-changer">
      <BookManager>
        {({shelves, getShelfByBook, moveBookToShelf}) => (
          <select
            value={getShelfByBook(book)}
            onChange={e => moveBookToShelf(book, e.target.value)}
          >
            <option value="none" disabled>
              Move to...
            </option>
            {shelves.map(shelf => (
              <option key={shelf.id} value={shelf.id}>
                {shelf.title}
              </option>
            ))}
            <option value="none">None</option>
          </select>
        )}
      </BookManager>
    </div>
  );
}

BookShelfChanger.propTypes = {
  book: BookType.isRequired
};

export default BookShelfChanger;
