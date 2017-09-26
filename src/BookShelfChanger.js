import React from 'react';
import PropTypes from 'prop-types';
import {BookType, ShelfType} from './types';

function BookShelfChanger({book, shelfId, shelves, moveBookToShelf}) {
  return (
    <div className="book-shelf-changer">
      <select
        value={shelfId}
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
    </div>
  );
}

BookShelfChanger.propTypes = {
  book: BookType.isRequired,
  shelfId: PropTypes.string,
  shelves: PropTypes.arrayOf(ShelfType).isRequired,
  moveBookToShelf: PropTypes.func.isRequired
};

export default BookShelfChanger;
