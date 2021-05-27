import {MESSAGES, TOAST_SETTINGS} from "../../constants";
import {toast} from "react-toastify";

export const ServerMessageHandler = (response, onSuccess, onError, noShow) => {
    if (!response.success) {
        let errorMessage;
        if (response.error === MESSAGES.ERROR.AUTH) {
            errorMessage = MESSAGES.ERROR.AUTH
            //unlogin
        } else if (response.message) {
            errorMessage = response.message
        } else {
            errorMessage = MESSAGES.ERROR.UNKNOWN
        }
        toast.error(errorMessage, TOAST_SETTINGS);
        onError && typeof onError === 'function' && onError(errorMessage)
    }
    if (response.success) {
        !noShow && toast.success(MESSAGES.SUCCESS.SUCCESS, TOAST_SETTINGS);
        onSuccess && typeof onSuccess === 'function' && onSuccess()
    }
}