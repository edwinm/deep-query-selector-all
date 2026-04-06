/**
 @version 1.1.0
 @copyright 2023 Edwin Martin
 @license MIT
 */
export function deepQuerySelectorAll(query, element = document.body) {
    var _a, _b;
    const result = Array.from(element.shadowRoot
        ? element.shadowRoot.childNodes
        : element.nodeName === 'SLOT'
            ? element.assignedElements()
            : element.childNodes)
        .filter((element) => element instanceof Element)
        .map((element) => deepQuerySelectorAll(query, element))
        .flat();
    if ((_b = (_a = element).matches) === null || _b === void 0 ? void 0 : _b.call(_a, query)) {
        result.push(element);
    }
    return result;
}
//# sourceMappingURL=dqsa.js.map