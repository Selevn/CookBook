import React, { useCallback, useEffect, useState } from 'react';
import debouncer from '../common/Debouncer';

const calculatePercent = () => {
  return (
    (window.pageYOffset / (document.querySelector('body').offsetHeight - window.innerHeight)) * 100
  );
};
// не работает loader потому что запрос идёт во внешнем компоненте
export const InfinityScrolls = ({ children, hasMore, loader, next, dataLength }) => {
  const fetcher = useCallback(() => {
    next();
  }, [dataLength]);

  const [loading, setLoading] = useState(false);
  const nextHandler = debouncer(() => {
    /* setter(s=>!s) */
    setLoading(true);
    fetcher();
    setLoading(false);
  }, 500);

  const scrollHandler = () => {
    if (calculatePercent() > 80) {
      if (hasMore && !loading) {
        nextHandler();
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <>
      {children}
      {loading && loader}
    </>
  );
};
