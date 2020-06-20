export function queryParentElementByClass(targetElement, classSelector) {
    let curParentElem = targetElement.parentElement;

    while (true) {
        if (curParentElem) {
            let classes = curParentElem.className;
            if (classes) {
                if (classes.split(/\s/i).includes(classSelector)) {
                    return curParentElem;
                }
            }
        }
        else return null;

        curParentElem = curParentElem.parentElement;
    }
}