import { useSelector } from 'react-redux';

export function useReduxState() {
  return {
    profile: useSelector((state) => state.profile),
    auth: useSelector((state) => state.auth),
  };
}
