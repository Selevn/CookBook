const debouncer = (func, wait) => {
    let timeout;
    return function executedFunction() {
        const context = this;
        const later = function() {
            timeout = null;
        };
        const callNow = !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context);
    };
};

export default debouncer