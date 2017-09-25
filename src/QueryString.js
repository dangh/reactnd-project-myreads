import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router';

function QueryString({paramName, children}) {
  return (
    <Route
      render={({location, history}) =>
        children({
          query: decodeURIComponent(
            location.search.replace(`?${paramName}=`, '')
          ),
          updateQuery: query =>
            history.replace({
              pathname: location.pathname,
              search: `?${paramName}=${encodeURIComponent(query)}`
            })
        })}
    />
  );
}

QueryString.propTypes = {
  paramName: PropTypes.string,
  children: PropTypes.func.isRequired
};

QueryString.defaultProps = {
  paramName: 'q'
};

export default QueryString;
