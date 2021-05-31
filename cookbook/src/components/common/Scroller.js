import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return <>{children}</>;
}

export default withRouter(ScrollToTop);

ScrollToTop.propTypes = {
  children: PropTypes.any,
  history: PropTypes.any,
};
