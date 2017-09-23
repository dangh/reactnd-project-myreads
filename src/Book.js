import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      coverUrl: PropTypes.string.isRequired
    }).isRequired,
    shelfId: PropTypes.string,
    shelfs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string
      })
    ).isRequired,
    moveToShelf: PropTypes.func.isRequired
  };

  render() {
    const {
      book: {id, coverUrl, title, author},
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
              width: 128,
              height: 174,
              backgroundImage: `url("${coverUrl}")`
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
        <div className="book-authors">{author}</div>
      </div>
    );
  }
}
