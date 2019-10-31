const ls = window.localStorage;

export default ({
    setItem: ls.setItem.bind(ls),
    getItem: ls.getItem.bind(ls),
    clear: ls.clear.bind(ls),
});
