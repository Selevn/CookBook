import { toast } from 'react-toastify';
import { MESSAGES, TOAST_SETTINGS } from '../../constants';

export const ServerMessageHandler = (response, onSuccess, onError, noShow) => {
  if (!response.success) {
    let errorMessage;
    if (response.error === MESSAGES.ERROR.AUTH) {
      errorMessage = MESSAGES.ERROR.AUTH;
      // unlogin
    } else if (response.message) {
      errorMessage = response.message;
    } else {
      errorMessage = MESSAGES.ERROR.UNKNOWN;
    }
    toast.error(errorMessage, TOAST_SETTINGS);
    if (onError && typeof onError === 'function') onError(errorMessage);
  }
  if (response.success) {
    if (!noShow) toast.success(MESSAGES.SUCCESS.SUCCESS, TOAST_SETTINGS);
    if (onSuccess && typeof onSuccess === 'function') onSuccess();
  }
};
