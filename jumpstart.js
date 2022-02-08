/**
 * Get an initial properties object from a DOM element [data-props] attribute value.
 * 
 * @param {Element} el
 * @returns {Object}
 */
function getProps(el) {
    return Object.freeze(JSON.parse(el.dataset.props ?? '{}'));
}

/**
 * Get a map of descendent elements identified by their [data-ref] attribute value.
 * Multiple refs with the same key get added to an array.
 * 
 * @param {Element} el 
 * @returns {Object.<string, Element|Element[]>} The complete ref object.
 */
function getRefs(el) {
    let refs = {};

    el.querySelectorAll('[data-ref]').forEach(el => {
        let refKey = el.dataset.ref;

        if (refs[refKey] === undefined) {
            refs[refKey] = el;
            return;
        }

        if (refs[refKey] instanceof Array) {
            refs[refKey].push(el);
            return;
        }

        refs[refKey] = [refs[refKey], el];
    });

    return refs;
}

/**
 * Hook up a callback function to all elements with a [data-mounts] value of `name`. Callback receives the root element, props, and refs as parameters.
 * 
 * @param {string} name The name of the callback to mount. Matches its [data-mounts] attribute value. 
 * @param {(root: Element, props: Object, refs: Object.<string, Element|Element[]>) => void} callback The function used to hook up events and perform actions on the root element and its children.
 */
function mount(name, callback) {
    document.querySelectorAll(`[data-mounts="${name}"]`).forEach(el => {
        callback(el, getProps(el), getRefs(el));
    });
}

export { getProps, getRefs, mount };
