/**
 @copyright 2023 Edwin Martin
 @license MIT
 */
export function deepQuerySelectorAll(query, element = document) {
    var _a, _b;
    const result = Array.from(element.shadowRoot
        ? element.shadowRoot.childNodes
        : element.nodeName === 'SLOT'
            ? element.assignedElements()
            : element.childNodes)
        .map((e) => deepQuerySelectorAll(query, e))
        .flat();
    if ((_b = (_a = element).matches) === null || _b === void 0 ? void 0 : _b.call(_a, query)) {
        result.push(element);
    }
    return result;
}
//# sourceMappingURL=dqsa.js.map