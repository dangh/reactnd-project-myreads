import React from 'react';
import PropTypes from 'prop-types';

export default class Book extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    coverUrl: PropTypes.string.isRequired,
    shelf: PropTypes.string,
    shelfs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        label: PropTypes.string
      })
    ).isRequired
  };

  render() {
    const {coverUrl, title, author, shelfs} = this.props;

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
            <select>
              <option value="none" disabled>
                Move to...
              </option>
              {shelfs.map(shelf => (
                <option key={shelf.id} value={shelf.id}>
                  {shelf.title}
                </option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    );
  }
}
