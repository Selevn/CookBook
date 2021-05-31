import { withRouter, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { STATE } from '../../constants';
import { hasItem as getItem } from '../../Connectors/dataProvider';
import { Loading } from '../MultyUsed/Loading/Loading';

export const NotFoundMiddleware = ({ children, match, propType }) => {
  const [hasItem, setHasItem] = useState(STATE.INIT);
  const { id, type: paramType } = match.params;
  const type = propType || paramType;
  useEffect(() => {
    (async () => {
      const data = await getItem(type, id);
      if (data) setHasItem(STATE.OK);
      else setHasItem(STATE.FAIL);
    })();
  }, [type, id, setHasItem]);

  return (
    <>
      {hasItem === STATE.INIT && <Loading />}
      {hasItem === STATE.OK && <>{children}</>}
      {hasItem === STATE.FAIL && <Redirect to="/404" />}
    </>
  );
};

export default withRouter(NotFoundMiddleware);

NotFoundMiddleware.propTypes = {
  children: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      type: PropTypes.string,
    }),
  }),
  propType: PropTypes.string,
};
