import { COMMON } from '../../constants';

export const searchSorter = (type) => {
  if (!type) {
    return () => {
      throw new Error(`Type was falsy type! Type: ${type}`);
    };
  }
  switch (type) {
    case COMMON.POPULAR:
      return (a, b) => b.views - a.views;
    case COMMON.NEWEST:
      return (a, b) => Date.parse(b.creationDate) - Date.parse(a.creationDate);
    case COMMON.LIKED:
      return (a, b) => b.likes - a.likes;
    case COMMON.OURCHOISE:
      return () => Math.random() - 0.5;
    default:
      return () => {
        throw new Error(
          `searchSorter function default condition. Check your input value. it was ${type}`,
        );
      };
  }
};
