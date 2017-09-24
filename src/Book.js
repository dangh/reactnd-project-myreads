import React from 'react';
import PropTypes from 'prop-types';
import {BookType, ShelfType} from './types';

export default class Book extends React.Component {
  static propTypes = {
    book: BookType.isRequired,
    shelfId: PropTypes.string,
    shelfs: PropTypes.arrayOf(ShelfType).isRequired,
    moveToShelf: PropTypes.func.isRequired
  };

  render() {
    const {
      book: {id, title, authors, imageLinks},
      shelfs,
      shelfId,
      moveToShelf
    } = this.props;

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
          <div className="book-shelf-changer">
            <select
              value={shelfId}
              onChange={e => moveToShelf(id, e.target.value)}
            >
              <option value="none" disabled>
                Move to...
              </option>
              {shelfs.map(shelf => (
                <option key={shelf.id} value={shelf.id}>
                  {shelf.title}
                </option>
              ))}
              {shelfId && <option value="none">None</option>}
            </select>
          </div>
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
}
