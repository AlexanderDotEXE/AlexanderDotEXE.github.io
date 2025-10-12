import { Cell } from './CellClass.js';
import { initContextMenu, rightClick, hideMenu, currentCell } from './ContextMenu.js';
import { solveAStar } from './A-Star.js';

let cells = [];
let pathRun = false;

init();

function init() {
    initGrid();
    initContextMenu();
}

function initGrid() {
    cells = [];
    pathRun = false;
    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = "";
    const rows = 14;
    const cols = 14;

    for (let r = 0; r < rows; r++) {
        const row = document.createElement('div');
        row.classList.add('row');
        row.className = 'row';
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');

            cell.onmouseover = (e) => {
                if(e.buttons == 1)
                    selectCell(cell);
            }

            cell.onclick = () => {
                selectCell(cell);
            }

            cell.className = 'cell';
            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.oncontextmenu = rightClick;

            cells.push(new Cell(r, c, cell));

            row.appendChild(cell);
        }
        gridElement.appendChild(row);
    }
}

export function setStart() {
    hideMenu();
    if (!currentCell) return;

    cells.forEach(cell => {
        if (cell.element.classList.contains('start')) {
            cell.element.classList.remove('start');
        }
        if (pathRun) {
            removePaths();
        }
    });

    currentCell.classList.remove('obstacle');
    currentCell.classList.add('start');
}

function selectCell(cell) {
    if (pathRun) {
        removePaths();
    }

    cell.classList.toggle('obstacle');
}

export function setEnd() {
    hideMenu();
    if (!currentCell) return;

    cells.forEach(cell => {
        if (cell.element.classList.contains('end')) {
            cell.element.classList.remove('end');
        }
    });

    if (pathRun) {
        removePaths();
    }

    currentCell.classList.remove('obstacle');
    currentCell.classList.add('end');
}

export async function start() {
    removePaths();
    // Aktualisiere den Status der Zellen basierend auf ihren CSS-Klassen
    cells.forEach(cell => {
        if (cell.element.classList.contains('start')) {
            cell.isStart = true;
        } else if (cell.element.classList.contains('end')) {
            cell.isEnd = true;
        } else if (cell.element.classList.contains('obstacle')) {
            cell.isWall = true;
        } else {
            cell.isWall = false;
        }
    });
    console.log(cells);

    let visualize = document.getElementById('visualize').checked;

    let path = await solveAStar(cells, visualize);
    path.forEach(cell => {
        if (!cell.element.classList.contains('start') && !cell.element.classList.contains('end')) {
            cell.element.classList.add('path')
        }
    });
    pathRun = true;
}

export function reset() {
    initGrid();
}

function removePaths() {
    cells.forEach(c => { c.element.classList.remove('path') });
}
// Stelle Funktionen global verfügbar (für inline onclick in HTML)
window.setStart = setStart;
window.setEnd = setEnd;
window.start = start;
window.reset = reset;