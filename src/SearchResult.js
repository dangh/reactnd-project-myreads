import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import * as BooksAPI from './BooksAPI';

export default class SearchResult extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    children: PropTypes.func.isRequired
  };

  state = {
    querying: false,
    books: []
  };

  componentDidMount() {
    this.searchBooks(this.props.query);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.query !== this.props.query) {
      this.searchBooks(nextProps.query);
    }
  }

  render() {
    const {children} = this.props;
    const {querying, books} = this.state;
    return children({querying, books});
  }

  searchBooks = query => {
    if (!query) {
      this.setState({
        querying: false,
        books: []
      });
      return;
    }

    this.setState({
      querying: true,
      books: []
    });

    this.performSearchBooks(query);
  };

  performSearchBooks = debounce(query => {
    BooksAPI.search(query, 10).then(books => {
      if (Array.isArray(books)) {
        this.setState({books, querying: false});
      } else {
        this.setState({books: [], querying: false});
      }
    });
  }, 350);
}
