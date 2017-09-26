import React from 'react';
import PropTypes from 'prop-types';
import {ShelfType} from './types';

export default class BookManager extends React.Component {
  static contextTypes = {
    bookstore: PropTypes.shape({
      shelves: PropTypes.arrayOf(ShelfType).isRequired,
      getBooksInShelf: PropTypes.func.isRequired,
      getShelfByBook: PropTypes.func.isRequired,
      moveBookToShelf: PropTypes.func.isRequired
    }).isRequired
  };

  static propTypes = {
    children: PropTypes.func.isRequired
  };

  render() {
    const {bookstore} = this.context;
    const {children} = this.props;
    return children(bookstore);
  }
}
