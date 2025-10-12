export let currentCell = null;

export function initContextMenu() {
    document.onclick = hideMenu;
}

export function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none"
}

export function rightClick(e) {
    e.preventDefault();

    if (document.getElementById(
        "contextMenu").style.display == "block")
        hideMenu();
    else {
        currentCell = e.target;
        let menu = document
            .getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}
