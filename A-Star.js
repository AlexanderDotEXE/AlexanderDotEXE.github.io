let cells = [];
let startCell = null;
let endCell = null;

let openCells = [];
let closedCells = [];
let currentCell = null;

export async function solveAStar(inputCells, visualize) {
    cells = inputCells;
    startCell = cells.find(cell => cell.isStart);
    endCell = cells.find(cell => cell.isEnd);

    openCells = [];
    closedCells = [];
    currentCell = null;

    if (!startCell || !endCell) {
        alert("Start or End cell is missing!");
        return;
    }

    cells.forEach(c => {
        c.gCost = Infinity;
        c.hCost = 0;
        c.fCost = Infinity;
    });
    startCell.gCost = 0;


    openCells.push(startCell);
    let running = true;

    while(running) {
        currentCell = getLowestFCostCell();
        if(currentCell == undefined) {
            alert('No Path found');
            break;
        }else if(currentCell.isEnd) {
            running = false;
            break;
        }

        openCells = openCells.filter(c => c !== currentCell);        
        closedCells.push(currentCell);

        let neighboringCells = getNeighbors(currentCell);
        neighboringCells.forEach(e => {
            if (!e.isWall && !closedCells.includes(e)) {
                const tentativeG = currentCell.gCost + cost(currentCell, e);

                if (tentativeG < e.gCost || !openCells.includes(e)) {
                    e.gCost = tentativeG;
                    e.hCost = cost(endCell, e);
                    e.fCost = e.gCost + e.hCost;
                    e.parent = currentCell;

                    if (!openCells.includes(e)) {
                        openCells.push(e);
                    }
                }
            }
        });

        if(visualize) {
            openCells.forEach(c => {
                if(c != currentCell && !c.isStart && !c.isEnd) {
                    c.element.classList.add('open')
                }
            });

            closedCells.forEach(c => {
                if(c != currentCell && !c.isStart && !c.isEnd) {
                    c.element.classList.add('close')
                }
            });

            currentCell.element.classList.add('current');
            await Sleep(200);
        }
    }

    if(currentCell.isEnd) {
        cells.forEach(c => {
            if(c.element.classList.contains('open')) {
                c.element.classList.remove('open');
            }

            if(c.element.classList.contains('close')) {
                c.element.classList.remove('close');
            }

            if(c.element.classList.contains('current')) {
                c.element.classList.remove('current');
            }
        });

        let path = [];
        let temp = currentCell;
        while(temp) {
            path.push(temp);
            temp = temp.parent;
        }
        path.reverse();
        return path;
    }
    return [];
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function cost(a, b) {
    const dx = Math.abs(a.x - b.x);
    const dy = Math.abs(a.y - b.y);

    // Diagonal = 14 (≈ √2 * 10), gerade = 10
    return (dx === 1 && dy === 1) ? 14 : 10;
}


function getLowestFCostCell() {
    let lowest = openCells[0];
    for (let cell of openCells) {
        if (cell.fCost < lowest.fCost) {
            lowest = cell;
        }
    }
    return lowest;
}


function calculateCost(cell) {
    cell.gCost = cost(startCell, cell);
    cell.hCost = cost(endCell, cell);
    cell.fCost = cell.gCost + cell.hCost;
}

function getNeighbors(cell) {
    let neighbours = [];
    let x = cell.x;
    let y = cell.y;

    let directions = [
        [0, -1], // Up
        [1, 0],  // Right
        [0, 1],  // Down
        [-1, 0]  // Left
    ];

    for (let dir of directions) {
        let newX = x + dir[0];
        let newY = y + dir[1];

        if (newX >= 0 && newX < 20 && newY >= 0 && newY < 20) {
            let neighbor = cells.find(c => c.x === newX && c.y === newY);
            if (neighbor && !neighbor.isWall) {
                neighbours.push(neighbor);
            }
        }
    }

    return neighbours;
}