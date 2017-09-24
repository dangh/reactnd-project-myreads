import PropTypes from 'prop-types';

export const BookType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  coverUrl: PropTypes.string.isRequired
});

export const ShelfType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
});
