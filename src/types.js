import PropTypes from 'prop-types';

export const BookType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  imageLinks: PropTypes.shape({
    thumbnail: PropTypes.string
  }),
  shelf: PropTypes.string
});

export const ShelfType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
});
