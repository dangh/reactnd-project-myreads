import React from 'react';
import PropTypes from 'prop-types';

export default class Bookshelf extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.node)
  };

  render() {
    const {title, children} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {React.Children.map(children, node => (
              <li key={node.key}>{node}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
